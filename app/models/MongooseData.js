class MongooseData {
	constructor(name) {
		this.name = name;
		this.temporalrange = "";
		this.domain = "";
		this.kingdom = "";
		this.phylum = "";
		this.clade = [];
		this.suborder = "";
		this.family = "";
		this.subfamily = "";
		this.tribe = "";
		this.genus = "";
		this.species = "";
		this.description = "";
		this.diet = "";
		this.locomotionType = "";
		this.source = {
			pageTitle: "",
			author: "Wikipedia contributors",
			wikipediaURL: "",
			license: "",
			licenseURL: "",
			lastRevision: "",
			dateAccessed: "",
			revisionHistoryURL: "",
			source: "Wikipedia",
			publisher: "Wikipedia, The Free Encyclopedia",
			citation: "",
		};
		this.image = {
			title: "",
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
