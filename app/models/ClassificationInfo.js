const mongoose = require("mongoose");
const {
	sortInfo,
	getClassSorter,
	getOrderSorter,
	getFamilySorter,
} = require("../utils/classificationInfoSorter");
const mongooseHidden = require("mongoose-hidden")();
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
		clade: [String],
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
	},
});

ClassificationInfoSchema.pre("save", function (next) {
	this.classInfo = sortInfo(this.classInfo, getClassSorter());
	this.orderInfo = sortInfo(this.orderInfo, getOrderSorter());
	this.familyInfo = sortInfo(this.familyInfo, getFamilySorter());
	next();
});

const ClassificationInfo = model(
	"ClassificationInfo",
	ClassificationInfoSchema,
);

module.exports = {
	ClassificationInfoSchema: ClassificationInfoSchema,
	ClassificationInfo: ClassificationInfo,
};
