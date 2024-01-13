const fs = require("fs");
const parser = require("node-html-parser");
const { fetchData } = require("../utils/fetchData");
const dinoNames = require("./allDinoNames.json").names;

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
		for (const key of Object.keys(pages)) {
			const page = pages[key];
			if ("extract" in page) {
				const title = page.title;
				const extract = page.extract;
				dataObjs.push({ title: title, extract: extract });
			}
		}
	}
	return dataObjs;
}

function processData(allData) {
	const names = [];
	const locomotionRegex = new RegExp(
		"(bipedal|biped|flying|quadrupedal|quadruped)",
		"gmi",
	);
	const dietRegex = new RegExp("(\\b\\w*(ivore|ivorous))s?\\b", "gmi");
	for (const data of allData) {
		const extract = data.extract;
		if (dietRegex.test(extract) || locomotionRegex.test(extract)) {
			names.push(data.title);
		}
	}
	return names;
}

function writeToFile(names, filename) {
	const data = { names: names };
	fs.writeFile(filename, JSON.stringify(data, null, 2), err => {
		if (err) {
			console.error(err);
		} else {
			console.log("Successfully saved data to file.");
		}
	});
}

async function mainHandler() {
	const urls = constructUrls(dinoNames);
	const dataObjs = await handleUrls(urls);
	const names = await processData(dataObjs);
	console.log(names.length);
	writeToFile(names, "dinosaurNamesTest2.json");
}

async function retrieveAllDinoNames() {
	const data = await fetchData(
		"https://en.wikipedia.org/w/api.php?action=parse&page=List_of_dinosaur_genera&prop=text&formatversion=2&format=json",
	);
	const names = [];
	const htmlText = parser.parse(data.parse.text);
	const div = htmlText.querySelector(".mw-content-ltr");
	const lists = div.querySelectorAll("ul");
	const filteredLists = lists.slice(1, 79);
	for (const list of filteredLists) {
		const items = list.querySelectorAll("li");
		for (const item of items) {
			const iTag = item.querySelector("i");
			if (iTag) {
				const innerHTML = iTag.innerHTML;
				const pattern = /href="\/wiki\/([^"]*)"/;
				const match = innerHTML.match(pattern);
				if (match) {
					const dinoName = match[1].trim();
					names.push(dinoName);
				}
			}
		}
	}
	writeToFile(names, "allDinoNames.json");
}

mainHandler();
