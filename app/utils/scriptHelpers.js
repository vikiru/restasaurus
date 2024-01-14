const parser = require("node-html-parser");
const { fetchData } = require("./fetchData");
const keywords = [
	"Domain:",
	"Kingdom:",
	"Phylum:",
	"Clade:",
	"Superclass:",
	"Class:",
	"Subclass:",
	"Infraclass:",
	"Subterclass:",
	"Parvclass:",
	"Magnorder:",
	"Superorder:",
	"Grandorder:",
	"Mirorder:",
	"Order:",
	"Suborder:",
	"Infraorder:",
	"Parvorder:",
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
 * @returns
 */
async function retrieveHTMLContent(dinosaurName, data) {
	const request = await fetchData(
		`https://en.wikipedia.org/w/api.php?action=parse&page=${dinosaurName}&prop=text&formatversion=2&format=json`,
	);
	const htmlText = request.parse.text;
	const parsedHTML = parser.parse(htmlText);
	data = retrieveBoxData(parsedHTML, data);
	data.diet = findDiet(parsedHTML);

	return data;
}

function assignClassificationInfo(data, keyword, value) {
	const actions = {
		order: () =>
			data.classificationInfo.orderInfo.push({
				orderType: keyword,
				value,
			}),
		class: () =>
			data.classificationInfo.classInfo.push({
				classType: keyword,
				value,
			}),
		family: () =>
			data.classificationInfo.familyInfo.push({
				familyType: keyword,
				value,
			}),
		tribe: () =>
			data.classificationInfo.tribeInfo.push({
				tribeType: keyword,
				value,
			}),
		genus: () =>
			data.classificationInfo.genusInfo.push({
				genusType: keyword,
				value,
			}),
		clade: () => data.classificationInfo.clade.push(value),
	};
	const action = actions[keyword.toLowerCase()];
	if (action) {
		action();
	} else if (value.includes("\n")) {
		data[`classificationInfo`][keyword] = value.split("\n")[0];
	} else {
		data[`classificationInfo`][keyword] = value;
	}
}

/**
 * After passing in parsed HTML data, retrieve all of the data within the Wikipedia Infobox section according to the specified
 * keywords.
 * @param {*} html
 * @returns
 */
function retrieveBoxData(html, data) {
	const infoBox = html.querySelector("table");
	const tableBody = infoBox.querySelector("tbody");
	const rows = tableBody.querySelectorAll("tr");
	const firstRowData = rows[0].structuredText.split("\n");
	data.temporalrange = handleTemporalRange(firstRowData);
	const filteredRows = rows.filter((_, index) => index > 3);

	for (const row of filteredRows) {
		const rowData = row.querySelectorAll("td");
		if (rowData.length > 1) {
			let keyword = rowData[0].structuredText.trim();
			const keywordRegex = new RegExp("order|class", "gmi");
			if (!keywordRegex.test(keyword)) {
				keyword = rowData[0].structuredText.toLowerCase();
			}
			keyword = String(keyword.replace(":", ""));
			const value = String(
				rowData[1].structuredText.trim().replace("†", ""),
			);
			assignClassificationInfo(data, keyword, value);
		}
	}
	return data;
}

/**
 * Returns the temporal range value for a given Dinosaur.
 * @param {*} rowData
 * @returns
 */
function handleTemporalRange(rowData) {
	return rowData.reduce((temporalRange, data) => {
		const text = data.trim();
		if (text.includes("Temporal range")) {
			return text.replace("Temporal range: ", "").trim();
		} else if (text.includes("Ma") && !text.includes("Temporal range")) {
			return `${temporalRange}, ${text}`;
		}
		return temporalRange;
	}, "");
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

	const pageDataKey = Object.keys(result.query.pages)[0];
	const pageData = result.query.pages[pageDataKey];
	const { rightsinfo: licenseInfo } = result.query;

	if (pageData.extract) {
		data.description = pageData.extract.split("\n")[0];
	}

	data.diet = findDiet(pageData);
	data.locomotionType = findLocomotionType(pageData);
	data.source = handleSourceInformation(
		data,
		dinosaurName,
		pageData,
		licenseInfo,
	);

	if (pageData.pageimage) {
		const imageName = pageData.pageimage;
		const imageQueryURL = `https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata|url&titles=File:${imageName}&format=json`;
		const imageResult = await fetchData(imageQueryURL);
		data = handleImageData(data, imageResult);
	}
	return data;
}

/**
 * Use the obtained image data for a given Wikipedia Image and assign the relevant values necessary for a DinosaurImage model.
 * @param {*} data
 * @param {*} result
 * @returns
 */
function handleImageData(data, result) {
	const mainData = result.query.pages[Object.keys(result.query.pages)[0]];

	if (mainData.imageinfo) {
		const {
			imageinfo: [imageInfo],
			title,
		} = mainData;
		const { extmetadata: metaData } = imageInfo;

		const imageTitle = title.replace("File:", "");
		const extension = imageTitle.lastIndexOf(".");
		data.image.title = imageTitle.substring(0, extension);

		if (metaData.ImageDescription) {
			data.image.description = parser.parse(
				metaData.ImageDescription.value,
			).structuredText;
		}

		if (metaData.Artist) {
			data = handleAuthor(data, metaData.Artist.value);
		}

		data.image.imageURL = imageInfo.descriptionurl;

		if (
			metaData.LicenseShortName &&
			metaData.LicenseShortName.value !== "Public domain" &&
			metaData.UsageTerms &&
			metaData.LicenseUrl
		) {
			data.image.license = metaData.UsageTerms.value;
			data.image.licenseURL = metaData.LicenseUrl.value;
		} else {
			data.image.license = metaData.LicenseShortName.value;
			data.image.licenseURL =
				"https://creativecommons.org/public-domain/";
		}

		if (metaData.DateTime) {
			data.image.dateCreated = new Date(
				metaData.DateTime.value,
			).toISOString();
		}

		data.image.dateAccessed = new Date().toISOString();
	}
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
		const { innerHTML, structuredText } = authorAnchor;
		data.image.author = structuredText;
		const hrefRegex = new RegExp('href="[/]*([\\w]*[^"]*)', "gmi");
		const match = hrefRegex.exec(innerHTML);
		if (match && match[1]) {
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
	const source = {};

	if (dinosaurName) {
		source.pageTitle = dinosaurName;
	}

	if (pageData.fullurl) {
		source.wikipediaURL = pageData.fullurl;
	}

	if (
		pageData.revisions &&
		pageData.revisions[0] &&
		pageData.revisions[0].timestamp
	) {
		source.lastRevision = pageData.revisions[0].timestamp;
	}

	source.dateAccessed = new Date().toISOString();

	if (dinosaurName) {
		source.revisionHistoryURL = `https://en.wikipedia.org/w/index.php?title=${dinosaurName}&action=history`;
	}

	if (licenseInfo.text) {
		source.license = licenseInfo.text;
	}

	if (licenseInfo.url) {
		source.licenseURL = licenseInfo.url;
	}

	if (
		dinosaurName &&
		pageData.revisions &&
		pageData.revisions[0] &&
		pageData.revisions[0].revid
	) {
		source.permalink = `https://en.wikipedia.org/w/index.php?title=${dinosaurName}&oldid=${pageData.revisions[0].revid}`;
	}

	if (data.source) {
		source.citation = createCitation(data.source);
	}
	return source;
}

/**
 * Utilzing a regExp, determine the diet of a given Dinosaur based on the provided article extract.
 * @param {*} data
 * @param {*} pageData
 * @returns
 */
function findDiet(pageData) {
	let diet = "";
	const dietRegex = new RegExp("(\\b\\w*(ivore|ivorous))s?\\b", "gmi");

	if ("extract" in pageData) {
		const matches = pageData.extract.match(dietRegex);
		if (matches && matches.length > 0) {
			diet = matches[0].replace("orous", "ore");
		}
	} else {
		const pageText = pageData.structuredText.split("\n");
		const dietCount = {};
		const filteredText = pageText
			.map(text => text.trim())
			.filter(text => dietRegex.test(text));

		for (const text of filteredText) {
			const match = dietRegex.exec(text);
			if (match) {
				const dietType = match[0].toLowerCase().replace("orous", "ore");
				dietCount[dietType] = (dietCount[dietType] || 0) + 1;
			}
		}

		if (Object.keys(dietCount).length > 0) {
			const maxCountKey = Object.entries(dietCount).reduce(
				(maxEntry, currentEntry) => {
					return currentEntry[1] > maxEntry[1]
						? currentEntry
						: maxEntry;
				},
			)[0];
			diet = maxCountKey;
		}
		diet = diet.replace("mega", "").replace("vores", "vore").trim();
		return diet;
	}
}

/**
 * Utilizing a regExp, determine the locomotion type of a given Dinosaur based on the provided article extract.
 * @param {*} data
 * @param {*} pageData
 * @returns
 */
function findLocomotionType(pageData) {
	const locomotionRegex =
		/(bipedal|biped|quadrupedal|quadruped|glide|gliding|flying|swim|swimming)/gim;
	const matches = pageData.extract.match(locomotionRegex);
	return matches && matches[0] ? matches[0].replace("pedal", "ped") : "";
}

function formatDate(dateString) {
	return new Date(dateString).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

/**
 * Given the source data of a Wikipedia article, return an MLA citation String.
 * @param {*} sourceData
 * @returns MLA citation
 */
function createCitation(sourceData) {
	const formattedRevision = formatDate(sourceData.lastRevision);
	const formattedAccessed = formatDate(sourceData.dateAccessed);

	const citation = `${sourceData.author}. "${sourceData.pageTitle}." ${sourceData.publisher}. ${sourceData.publisher}, ${formattedRevision}. Web. ${formattedAccessed}.`;
	return citation;
}

module.exports = {
	retrieveHTMLContent: retrieveHTMLContent,
	retrieveBoxData: retrieveBoxData,
	keywords: keywords,
	retrieveInformation: retrieveInformation,
	findDiet: findDiet,
	findLocomotionType: findLocomotionType,
	handleAuthor: handleAuthor,
	handleImageData: handleImageData,
	handleSourceInformation: handleSourceInformation,
	createCitation: createCitation,
};
