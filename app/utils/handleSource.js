function handleSourceInformation(data, dinosaurName, pageData, licenseInfo) {
	data.source.pageTitle = dinosaurName;
	data.source.wikipediaURL = getWikipediaURL(pageData);
	data.source.lastRevision = getLastRevision(pageData);
	data.source.revisionHistoryURL = getRevisionHistoryURL(dinosaurName);
	data.source.dateAccessed = new Date().toISOString();
	data.source.license = getLicense(licenseInfo);
	data.source.licenseURL = getLicenseURL(licenseInfo);
	data.source.permalink = getPermalink(dinosaurName, pageData);
	data.source.citation = createCitation(data.source);
	return data.source;
}

function getWikipediaURL(pageData) {
	return pageData.fullurl || "";
}

function getLastRevision(pageData) {
	if (pageData.revisions && pageData.revisions[0]) {
		return pageData.revisions[0].timestamp || "";
	}
	return "";
}

function getRevisionHistoryURL(dinosaurName) {
	return `https://en.wikipedia.org/w/index.php?title=${dinosaurName}&action=history`;
}

function getLicense(licenseInfo) {
	return licenseInfo.text || "";
}

function getLicenseURL(licenseInfo) {
	return licenseInfo.url || "";
}

function getPermalink(dinosaurName, pageData) {
	if (dinosaurName && pageData.revisions && pageData.revisions[0]) {
		return `https://en.wikipedia.org/w/index.php?title=${dinosaurName}&oldid=${pageData.revisions[0].revid}`;
	}
	return "";
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

	const citation = `${sourceData.author}. "${sourceData.pageTitle}." ${sourceData.source}. ${sourceData.publisher}, ${formattedRevision}. Web. ${formattedAccessed}.`;
	return citation;
}

module.exports = {
	handleSourceInformation: handleSourceInformation,
	getWikipediaURL: getWikipediaURL,
	getLastRevision: getLastRevision,
	getRevisionHistoryURL: getRevisionHistoryURL,
	getLicense: getLicense,
	getLicenseURL: getLicenseURL,
	getPermalink: getPermalink,
};
