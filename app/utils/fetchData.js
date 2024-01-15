/**
 * Fetch a given url and return the response data as an object.
 * @param {*} url
 * @returns JSON Response Data
 */
async function fetchData(url) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error, status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Fetch failed: ${error.message}`);
	}
}

module.exports = {
	fetchData,
};
