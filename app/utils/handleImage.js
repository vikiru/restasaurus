const parser = require("node-html-parser");

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

function handleImageData(data, result) {
	const mainData = getMainData(result);

	if (mainData.imageinfo) {
		const {
			imageinfo: [imageInfo],
			title,
		} = mainData;
		const { extmetadata: metaData } = imageInfo;

		data.image.title = getImageTitle(title);
		data.image.description = getImageDescription(metaData);
		data = handleAuthor(data, metaData.Artist.value);
		data.image.imageURL = imageInfo.descriptionurl;
		data.image.license = getLicense(metaData);
		data.image.licenseURL = getLicenseURL(metaData);
		data.image.dateCreated = getDateCreated(metaData);
		data.image.dateAccessed = new Date().toISOString();
	}
	return data;
}

function getMainData(result) {
	return result.query.pages[Object.keys(result.query.pages)[0]];
}

function getImageTitle(title) {
	const imageTitle = title.replace("File:", "");
	const extension = imageTitle.lastIndexOf(".");
	return imageTitle.substring(0, extension);
}

function getImageDescription(metaData) {
	if (metaData.ImageDescription) {
		return parser.parse(metaData.ImageDescription.value).structuredText;
	}
	return "";
}

function getLicense(metaData) {
	if (
		metaData.LicenseShortName &&
		metaData.LicenseShortName.value !== "Public domain" &&
		metaData.UsageTerms
	) {
		return metaData.UsageTerms.value;
	} else {
		return metaData.LicenseShortName.value;
	}
}

function getLicenseURL(metaData) {
	if (
		metaData.LicenseShortName &&
		metaData.LicenseShortName.value !== "Public domain" &&
		metaData.LicenseUrl
	) {
		return metaData.LicenseUrl.value;
	} else {
		return "https://creativecommons.org/public-domain/";
	}
}

function getDateCreated(metaData) {
	if (metaData.DateTime) {
		return new Date(metaData.DateTime.value).toISOString();
	}
	return "";
}

module.exports = {
	handleAuthor: handleAuthor,
	handleImageData: handleImageData,
	getMainData: getMainData,
	getImageTitle: getImageTitle,
	getImageDescription: getImageDescription,
	getLicense: getLicense,
	getLicenseURL: getLicenseURL,
	getDateCreated: getDateCreated,
};
