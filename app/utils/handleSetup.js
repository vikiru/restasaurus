const { fetchData } = require("../utils/fetchData");
const { writeData } = require("../utils/writeData");
const parser = require("node-html-parser");

function constructUrls(dinoNames) {
	const baseUrl = "https://en.wikipedia.org/w/api.php?";
	const groupSize = 10;
	const urls = [];
	for (let i = 0; i < dinoNames.length; i += groupSize) {
		const group = dinoNames.slice(i, i + groupSize);
		let result = group.join("|").trim();
		result = result.replace(",", "").trim();

		const url =
			baseUrl +
			`action=query&prop=extracts&exintro&explaintext&titles=${result}&format=json`;
		urls.push(url);
	}
	return urls;
}

async function handleUrls(urls) {
	const dataObjs = [];
	for (const url of urls) {
		const result = await fetchData(url);
		const pages = result.query.pages;
		dataObjs.push(...extractDataFromPages(pages));
	}
	return dataObjs;
}

function extractDataFromPages(pages) {
	const dataObjs = [];
	for (const key of Object.keys(pages)) {
		const page = pages[key];
		if ("extract" in page) {
			const title = page.title;
			const extract = page.extract;
			dataObjs.push({ title: title, extract: extract });
		}
	}
	return dataObjs;
}

function processData(allData) {
	const names = new Set();
	for (const data of allData) {
		if (isMatched(data.extract)) {
			names.add(data.title);
		}
	}
	return Array.from(names);
}

function isMatched(extract) {
	const locomotionRegex = new RegExp(
		"(bipedal|biped|flying|quadrupedal|quadruped)",
		"gmi",
	);
	const dietRegex = new RegExp("(\\b\\w*(ivore|ivorous))s?\\b", "gmi");
	return dietRegex.test(extract) || locomotionRegex.test(extract);
}

function extractDinoNames(htmlText) {
	const names = new Set();
	const div = htmlText.querySelector(".mw-content-ltr");
	const lists = div.querySelectorAll("ul");
	const filteredLists = lists.slice(1, 79);
	for (const list of filteredLists) {
		const items = list.querySelectorAll("li");
		for (const item of items) {
			const dinoName = extractNameFromItem(item);
			if (dinoName) {
				names.add(dinoName);
			}
		}
	}
	return Array.from(names);
}

function extractNameFromItem(item) {
	const iTag = item.querySelector("i");
	if (iTag) {
		const innerHTML = iTag.innerHTML;
		const pattern = /href="\/wiki\/([^"]*)"/;
		const match = innerHTML.match(pattern);
		if (match) {
			return match[1].trim();
		}
	}
	return null;
}

async function retrieveAllDinoNames() {
	console.log("Retrieving all dino names");
	const data = await fetchData(
		"https://en.wikipedia.org/w/api.php?action=parse&page=List_of_dinosaur_genera&prop=text&formatversion=2&format=json",
	);
	const htmlText = parser.parse(data.parse.text);
	const names = extractDinoNames(htmlText).sort();
	await writeData({ names: names }, "allDinoNames.json");
	return names;
}

module.exports = {
	constructUrls: constructUrls,
	processData: processData,
	handleUrls: handleUrls,
	extractDataFromPages: extractDataFromPages,
	isMatched: isMatched,
	extractDinoNames: extractDinoNames,
	extractNameFromItem: extractNameFromItem,
	retrieveAllDinoNames: retrieveAllDinoNames,
};
