const {
	cladeDefaults,
	orderDefaults,
	familyDefaults,
} = require("./helperConstants");

function findFeature(pageData, featureRegex, replacements) {
	let feature = "";
	if ("extract" in pageData) {
		const matches = pageData.extract.match(featureRegex);
		if (matches && matches.length > 0) {
			feature = matches[0];
			for (const [original, replacement] of replacements) {
				feature = feature.replace(original, replacement);
			}
		}
	} else {
		const pageText = pageData.structuredText.split("\n");
		const featureCount = {};
		const filteredText = pageText
			.map(text => text.trim())
			.filter(text => featureRegex.test(text));
		for (const text of filteredText) {
			const match = featureRegex.exec(text);
			if (match) {
				let featureType = match[0].toLowerCase();
				for (const [original, replacement] of replacements) {
					featureType = featureType.replace(original, replacement);
				}
				featureCount[featureType] =
					(featureCount[featureType] || 0) + 1;
			}
		}

		if (Object.keys(featureCount).length > 0) {
			const maxCountKey = Object.entries(featureCount).reduce(
				(maxEntry, currentEntry) => {
					return currentEntry[1] > maxEntry[1]
						? currentEntry
						: maxEntry;
				},
			)[0];
			feature = maxCountKey;
		}
	}
	return feature;
}

function findDiet(pageData) {
	const dietRegex = new RegExp("(\\b\\w*(ivore|ivorous))s?\\b", "gmi");
	const replacements = [
		["orous", "ore"],
		["mega", ""],
		["vores", "vore"],
	];
	return findFeature(pageData, dietRegex, replacements);
}

function findLocomotionType(pageData) {
	const locomotionRegex =
		/(bipedal|biped|quadrupedal|quadruped|glide|gliding|flying|swim|swimming)/gim;
	const replacements = [
		["pedal", "ped"],
		["swim", "swimming"],
		["glide", "gliding"],
	];
	return findFeature(pageData, locomotionRegex, replacements);
}

function findFeatureByClassification(data) {
	const classificationInfo = data.classificationInfo;
	const families = classificationInfo.familyInfo;
	const orders = classificationInfo.orderInfo;
	const clades = classificationInfo.clade;

	searchClassification(clades, cladeDefaults, data);
	searchClassification(families, familyDefaults, data);
	searchClassification(orders, orderDefaults, data);
}

function searchClassification(items, defaults, data) {
	for (const item of items) {
		const value = item.value || item;
		if (value in defaults) {
			data.diet = data.diet || defaults[value].diet;
			data.locomotionType =
				data.locomotionType || defaults[value].locomotionType;
		}
	}
}

module.exports = {
	findFeature: findFeature,
	findDiet: findDiet,
	findLocomotionType: findLocomotionType,
	findFeatureByClassification: findFeatureByClassification,
	searchClassification: searchClassification,
};
