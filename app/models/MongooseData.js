class MongooseData {
	constructor(name) {
		this.name = name;
		this.temporalrange = "";
		this.domain = "";
		this.kingdom = "";
		this.phylum = "";
		this.clade = [];
		this.classInfo = [];
		this.orderInfo = [];
		this.family = "";
		this.subfamily = "";
		this.tribe = "";
		this.genus = "";
		this.species = "";
		this.diet = "";
		this.locomotionType = "";
		this.description = "";
		this.source = {
			pageTitle: "",
			author: "Wikipedia contributors",
			wikipediaURL: "",
			license: "",
			licenseURL: "",
			lastRevision: "",
			permalink: "",
			revisionHistoryURL: "",
			dateAccessed: "",
			source: "Wikipedia",
			publisher: "Wikipedia, The Free Encyclopedia",
			citation: "",
		};
		this.image = {
			title: "",
			description: "",
			author: "",
			authorURL: "",
			imageURL: "",
			license: "",
			licenseURL: "",
			dateCreated: "",
			dateAccessed: "",
		};
	}
}

module.exports = {
	MongooseData: MongooseData,
};
