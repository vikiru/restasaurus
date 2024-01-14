const parser = require("node-html-parser");
const { fetchData } = require("./fetchData");
const { retrieveBoxData } = require("./handleClassification");
const {
	findDiet,
	findLocomotionType,
	findFeatureByClassification,
} = require("./handleFeature");

async function retrieveHTMLContent(dinosaurName, data) {
	const parsedHTML = await fetchAndParseHTML(dinosaurName);
	data = retrieveBoxData(parsedHTML, data);
	data = retrieveDietAndLocomotionType(parsedHTML, data);
	data = findMissingFeatures(data);
	return data;
}

async function fetchAndParseHTML(dinosaurName) {
	const request = await fetchData(
		`https://en.wikipedia.org/w/api.php?action=parse&page=${dinosaurName}&prop=text&formatversion=2&format=json`,
	);
	const htmlText = request.parse.text;
	return parser.parse(htmlText);
}

function retrieveDietAndLocomotionType(parsedHTML, data) {
	data.diet = findDiet(parsedHTML);
	data.locomotionType = findLocomotionType(parsedHTML);
	return data;
}

function findMissingFeatures(data) {
	if (data.diet === "" || data.locomotionType === "") {
		findFeatureByClassification(data);
	}
	return;
}

module.exports = {
	retrieveHTMLContent: retrieveHTMLContent,
	fetchAndParseHTML: fetchAndParseHTML,
	retrieveDietAndLocomotionTypes: retrieveDietAndLocomotionType,
	findMissingFeatures: findMissingFeatures,
};
