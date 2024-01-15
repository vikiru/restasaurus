const { findDiet, findLocomotionType } = require("./handleFeature");
const { handleSourceInformation } = require("./handleSource");
const { handleImageData } = require("./handleImage");
const { fetchData } = require("./fetchData");

async function retrieveInformation(dinosaurName, data) {
	const result = await fetchData(getQueryURL(dinosaurName));
	const pageData = getPageData(result);
	const licenseInfo = getLicenseInfo(result);

	if (pageData.extract) {
		data.description = getDescription(pageData);
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
		const imageResult = await fetchData(
			getImageQueryURL(pageData.pageimage),
		);
		data = handleImageData(data, imageResult);
	}
	return data;
}

function getQueryURL(dinosaurName) {
	return `https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=rightsinfo&prop=revisions|pageimages|info|extracts&exintro=&explaintext=&inprop=url&titles=${dinosaurName}&format=json`;
}

function getPageData(result) {
	const pageDataKey = Object.keys(result.query.pages)[0];
	return result.query.pages[pageDataKey];
}

function getLicenseInfo(result) {
	return result.query.rightsinfo;
}

function getDescription(pageData) {
	return pageData.extract.split("\n")[0];
}

function getImageQueryURL(imageName) {
	return `https://en.wikipedia.org/w/api.php?action=query&prop=imageinfo&iiprop=extmetadata|url&titles=File:${imageName}&format=json`;
}

module.exports = {
	retrieveInformation: retrieveInformation,
	getPageData: getPageData,
	getQueryURL: getQueryURL,
	getDescription: getDescription,
	getLicenseInfo: getLicenseInfo,
	getImageQueryURL: getImageQueryURL,
};
