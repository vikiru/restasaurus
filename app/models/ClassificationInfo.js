const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const { sortInfo, getClassSorter, getOrderSorter, getFamilySorter } = require('../utils/classificationInfoSorter');

const { Schema, model } = mongoose;

const ClassificationInfoSchema = new Schema(
    {
        domain: String,
        kingdom: String,
        phylum: String,
        classInfo: [
            {
                classType: String,
                value: String,
                _id: false,
            },
        ],
        clade: { type: [String], index: true },
        orderInfo: [
            {
                orderType: String,
                value: String,
                _id: false,
            },
        ],
        familyInfo: [{ familyType: String, value: String, _id: false }],
        tribeInfo: [{ tribeType: String, value: String, _id: false }],
        genusInfo: [{ genusType: String, value: String, _id: false }],
        speciesInfo: [{ speciesType: String, value: String, _id: false }],
    },
    { retainKeyOrder: true },
);

ClassificationInfoSchema.plugin(mongooseHidden, {
    hidden: {
        _id: true,
        __v: true,
        createdAt: true,
        updatedAt: true,
    },
});

const ClassificationInfo = model('ClassificationInfo', ClassificationInfoSchema);

module.exports = {
    ClassificationInfoSchema,
    ClassificationInfo,
};
