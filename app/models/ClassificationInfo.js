const mongoose = require("mongoose");
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
	const sortInfo = (infoArray, sortOrder) => {
		infoArray.sort((a, b) => {
			return sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type);
		});
	};

	const classSorter = [
		"Superclass",
		"Class",
		"Subclass",
		"Infraclass",
		"Subterclass",
		"Parvclass",
	];
	sortInfo(this.classInfo, classSorter);

	const orderSorter = [
		"Magnorder",
		"Superorder",
		"Grandorder",
		"Mirorder",
		"Order",
		"Suborder",
		"Infraorder",
		"Parvorder",
	];
	sortInfo(this.orderInfo, orderSorter);

	const familySorter = ["Family", "Subfamily"];
	sortInfo(this.familyInfo, familySorter);

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
