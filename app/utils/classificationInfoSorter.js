function sortInfo(infoArray, sortOrder) {
	return infoArray.sort((a, b) => {
		return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
	});
}

function getClassSorter() {
	return [
		"Superclass",
		"Class",
		"Subclass",
		"Infraclass",
		"Subterclass",
		"Parvclass",
	];
}

function getOrderSorter() {
	return [
		"Magnorder",
		"Superorder",
		"Grandorder",
		"Mirorder",
		"Order",
		"Suborder",
		"Infraorder",
		"Parvorder",
	];
}

function getFamilySorter() {
	return ["Family", "Subfamily"];
}

module.exports = {
	sortInfo: sortInfo,
	getClassSorter: getClassSorter,
	getFamilySorter: getFamilySorter,
	getOrderSorter: getOrderSorter,
};
