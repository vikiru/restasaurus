/**
 * Fetch a given url and return the response data as an object.
 * @param {*} url
 * @returns JSON Response Data
 */
async function fetchData(url) {
	try {
		const result = await fetch(url).then(response => response.json());
		return result;
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	fetchData: fetchData,
};
