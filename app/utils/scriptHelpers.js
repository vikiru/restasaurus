const parser = require("node-html-parser");
const { fetchData } = require("./fetchData");
const keywords = [
	"Domain:",
	"Kingdom:",
	"Phylum:",
	"Clade:",
	"Suborder:",
	"Family:",
	"Subfamily:",
	"Genus:",
	"Temporal range:",
	"Tribe:",
	"Type species",
];

/**
 * Given a dinosaur name, return the content within the infobox section within a Wikipedia article.
 * @param {*} dinosaurName
 */
async function retrieveHTMLContent(dinosaurName, data) {
	const request = await fetchData(
		`https://en.wikipedia.org/w/api.php?action=parse&page=${dinosaurName}&prop=text&formatversion=2&format=json`,
	);
	const htmlText = request.parse.text;
	const parsedHTML = parser.parse(htmlText);
	data = retrieveBoxData(parsedHTML, data);
	return data;
}

/**
 * After passing in parsed HTML data, retrieve all of the data within the Wikipedia Infobox section according to the specified
 * keywords.
 * @param {*} html
 */

// TODO: Refactor this, can just use rowText + keywords similar to how type species was obtained.
function retrieveBoxData(html, data) {
	const title = data.name;
	const infoBox = html.querySelector("table");
	const rows = infoBox.querySelectorAll("tr");
	let prevText = "";
	for (const row of rows) {
		const headerData = row.querySelector("th");
		const rowText = row.structuredText.trim();
		if (headerData !== null) {
			const headerText = headerData.structuredText;
			const allHeaders = headerText.split("\n");
			if (allHeaders.includes(title)) {
				const temporalRange = allHeaders[1].replace(
					"Temporal range: ",
					"",
				);
				data.temporalrange = temporalRange;
			}
		}
		const tableData = row.querySelectorAll("td");
		for (let j = 0; j < tableData.length; j++) {
			const header = tableData[j];
			const text = header.structuredText;
			if (keywords.includes(text)) {
				const keyword = text.toLowerCase().replace(":", "");
				if (j + 1 < tableData.length) {
					const nextSibling = tableData[j + 1];
					const returnText = nextSibling.structuredText.replace(
						"†",
						"",
					);
					if (keyword === "clade") {
						data[keyword].push(returnText);
					} else if (keyword === "genus") {
						data[keyword] = returnText.split("\n")[0];
					} else {
						data[keyword] = returnText;
					}
				}
			}
		}
		if (rowText === "Type species") {
			prevText = rowText;
		}
		if (
			prevText === "Type species" &&
			prevText !== "" &&
			prevText !== rowText
		) {
			data.species = rowText.replace("†", "").split("\n")[0];
			prevText = "";
		}
	}
	return data;
}

/**
 * Given a dinosaur name, return an object containing the neccessary info for a DinosaurImage, DinosaurSource and partial info for a
 * DinosaurInfo model.
 * @param {*} dinosaurName
 * @param {*} data
 * @returns
 */
async function retrieveInformation(dinosaurName, data) {
	const queryURL = `https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=rightsinfo&prop=revisions|pageimages|info|extracts&exintro=&explaintext=&inprop=url&titles=${dinosaurName}&format=json`;
	const result = await fetchData(queryURL);

	const pageData =
		result.query.pages[`${Object.keys(result.query.pages)[0]}`];
	const licenseInfo = result.query.rightsinfo;
	const imageName = pageData.pageimage;

	const imageQueryURL = `https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata|url&titles=File:${imageName}&format=json`;
	const imageResult = await fetchData(imageQueryURL);

	data.description = pageData.extract.split("\n")[0];
	data.diet = findDiet(pageData);
	data.locomotionType = findLocomotionType(pageData);

	data = handleSourceInformation(data, dinosaurName, pageData, licenseInfo);
	data = handleImageData(data, imageResult);
	return data;
}

/**
 * Use the obtained image data for a given Wikipedia Image and assign the relevant values necessary for a DinosaurImage model.
 * @param {*} data
 * @param {*} result
 * @returns
 */
function handleImageData(data, result) {
	const mainData =
		result.query.pages[`${Object.keys(result.query.pages)[0]}`];
	const imageInfo = mainData.imageinfo[0];
	const metaData = imageInfo.extmetadata;

	const imageTitle = mainData.title.replace("File:", "");
	const extension = imageTitle.lastIndexOf(".");

	data.image.title = imageTitle.substring(0, extension);
	data = handleAuthor(data, metaData.Artist.value);
	data.image.imageURL = imageInfo.descriptionurl;

	if (metaData.LicenseShortName.value !== "Public domain") {
		data.image.license = metaData.UsageTerms.value;
		data.image.licenseURL = metaData.LicenseUrl.value;
	} else {
		data.image.license = metaData.LicenseShortName.value;
		data.image.licenseURL = "https://creativecommons.org/public-domain/";
	}

	data.image.dateCreated = new Date(
		`${metaData.DateTime.value}`,
	).toISOString();
	data.image.dateAccessed = new Date().toISOString();
	return data;
}

/**
 * Returns the author and author URL given the author metadata.
 * @param {*} data
 * @param {*} authorInfo
 * @returns
 */
function handleAuthor(data, authorInfo) {
	if (authorInfo.startsWith("<a") || authorInfo.includes("href=")) {
		const authorAnchor = parser.parse(authorInfo);
		const anchorHTML = authorAnchor.innerHTML;
		data.image.author = authorAnchor.structuredText;
		const hrefRegex = new RegExp('href="[/]*([w]*[^"]*)', "gmi");
		const match = hrefRegex.exec(anchorHTML);
		if (match.length == 2) {
			data.image.authorURL = `https://${match[1]}`;
		}
	} else {
		data.image.author = authorInfo;
		data.image.authorURL = "";
	}
	return data;
}

/**
 * Use the obtained data for a Wikipedia article and assign the neccessary information for a DinosaurSource model.
 * @param {*} data
 * @param {*} dinosaurName
 * @param {*} pageData
 * @param {*} licenseInfo
 * @returns
 */
function handleSourceInformation(data, dinosaurName, pageData, licenseInfo) {
	data.source.pageTitle = dinosaurName;
	data.source.wikipediaURL = pageData.fullurl;
	data.source.lastRevision = pageData.revisions[0].timestamp;
	data.source.dateAccessed = new Date().toISOString();
	data.source.revisionHistoryURL = `https://en.wikipedia.org/w/index.php?title=${dinosaurName}&action=history`;
	data.source.license = licenseInfo.text;
	data.source.licenseURL = licenseInfo.url;
	data.source.citation = createCitation(data.source);
	return data;
}

/**
 * Utilzing a regExp, determine the diet of a given Dinosaur based on the provided article extract.
 * @param {*} data
 * @param {*} pageData
 * @returns
 */
function findDiet(pageData) {
	let diet = "";
	const extract = pageData.extract;
	const dietRegex = new RegExp("([^\\s][\\w]*vor[\\w]*[^\\s])", "gmi");
	const matches = dietRegex.exec(extract);
	if (matches && matches.length > 0) {
		diet = String(matches[0]);
	}
	return diet;
}

/**
 * Utilizing a regExp, determine the locomotion type of a given Dinosaur based on the provided article extract.
 * @param {*} data
 * @param {*} pageData
 * @returns
 */
function findLocomotionType(pageData) {
	let locomotionType = "";
	const extract = pageData.extract;
	const locomotionRegex = new RegExp(
		"(bipedal|biped|flying|quadrupedal|quadruped)",
		"gmi",
	);
	const matches = locomotionRegex.exec(extract);
	if (matches && matches.length > 0) {
		locomotionType = String(matches[0]);
	}
	return locomotionType;
}

/**
 * Given the source data of a Wikipedia article, return an MLA citation String.
 * @param {*} sourceData
 * @returns MLA citation
 */
function createCitation(sourceData) {
	const formattedRevision = new Date(
		sourceData.lastRevision,
	).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	const formattedAccessed = new Date(
		sourceData.dateAccessed,
	).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});

	const citation = `${sourceData.author}. "${sourceData.pageTitle}" ${sourceData.publisher}. ${sourceData.publisher},  ${formattedRevision}. Web. ${formattedAccessed}.`;
	return citation;
}

module.exports = {
	retrieveHTMLContent: retrieveHTMLContent,
	retrieveBoxData: retrieveBoxData,
	keywords: keywords,
	retrieveInformation: retrieveInformation,
	findDietary: findDiet,
	findLocomotionType: findLocomotionType,
	handleAuthor: handleAuthor,
	handleImageData: handleImageData,
	handleSourceInformation: handleSourceInformation,
	createCitation: createCitation,
};
