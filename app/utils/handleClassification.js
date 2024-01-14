const { keywordRegex } = require("./helperConstants");

function assignClassificationInfo(data, keyword, value) {
	if (keyword === "Scientific classification") {
		return;
	}
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
		species: () =>
			data.classificationInfo.speciesInfo.push({
				speciesType: keyword,
				value: value,
			}),
		binomial: () =>
			data.classificationInfo.speciesInfo.push({
				speciesType: keyword,
				value: value,
			}),
	};
	const match = keyword.match(keywordRegex);
	let text = keyword.toLowerCase();
	if (match) {
		text = match[0].toLowerCase();
	}
	const action = actions[text];
	if (action) {
		action();
	} else {
		data[`classificationInfo`][text] = value;
	}
}

function getInfoBox(html) {
	return html
		.getElementsByTagName("table")
		.find(table => table.attributes.class === "infobox biota")
		.querySelector("tbody");
}

function getRows(infoBox) {
	return infoBox.querySelectorAll("tr");
}

function handleFirstRow(firstRow, data) {
	const firstRowData = firstRow.structuredText.split("\n");
	data.name = firstRowData[0].trim();
	data.temporalrange = handleTemporalRange(firstRowData);
}

function handleOtherRows(rows, data) {
	for (const row of rows) {
		const rowData = row.querySelectorAll("td");
		const headerData = row.querySelectorAll("th");
		if (rowData.length > 1) {
			handleRowData(rowData, data);
		} else if (
			headerData.length == 1 &&
			keywordRegex.test(headerData[0].structuredText.trim())
		) {
			handleHeaderData(headerData, rows, data);
		}
	}
}

function handleRowData(rowData, data) {
	let keyword = rowData[0].structuredText.trim();
	if (!keywordRegex.test(keyword)) {
		keyword = rowData[0].structuredText.toLowerCase();
	}
	keyword = keyword.replace(":", "");
	let value = rowData[1].structuredText.trim().replace("†", "");
	if (value.includes("\n")) {
		value = value.split("\n")[0];
	}
	assignClassificationInfo(data, keyword, value);
}

function handleHeaderData(headerData, rows, data) {
	const keyword = headerData[0].structuredText.trim();
	const index = rows.indexOf(rows) + 1;
	const headerRowData = rows[index].querySelectorAll("td");
	let value = headerRowData[0].structuredText.trim().replace("†", "");
	if (value.includes("\n")) {
		value = value.split("\n")[0];
	}
	assignClassificationInfo(data, keyword, value);
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

function retrieveBoxData(html, data) {
	const infoBox = getInfoBox(html);
	const rows = getRows(infoBox);
	handleFirstRow(rows[0], data);
	handleOtherRows(rows, data);
	return data;
}

module.exports = {
	assignClassificationInfo,
	retrieveBoxData,
	getInfoBox,
	getRows,
	handleFirstRow,
	handleOtherRows,
	handleHeaderData,
	handleTemporalRange,
};
