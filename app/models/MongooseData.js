class MongooseData {
    constructor(name) {
        this.name = name;
        this.temporalrange = '';
        this.classificationInfo = {
            domain: '',
            kingdom: '',
            phylum: '',
            clade: [],
            classInfo: [],
            orderInfo: [],
            familyInfo: [],
            tribeInfo: [],
            genusInfo: [],
            speciesInfo: [],
        };
        this.diet = '';
        this.locomotionType = '';
        this.description = '';
        this.source = {
            pageTitle: '',
            author: 'Wikipedia contributors',
            wikipediaURL: '',
            license: '',
            licenseURL: '',
            permalink: '',
            revisionHistoryURL: '',
            lastRevision: '',
            dateAccessed: '',
            source: 'Wikipedia, The Free Encyclopedia',
            publisher: 'Wikimedia Foundation',
            citation: '',
        };
        this.image = {
            title: '',
            description: '',
            author: '',
            authorURL: '',
            imageURL: '',
            license: '',
            licenseURL: '',
            dateCreated: '',
            dateAccessed: '',
        };
    }
}

module.exports = {
    MongooseData,
};
