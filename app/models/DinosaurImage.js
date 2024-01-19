const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();

const { Schema, model } = mongoose;

const DinosaurImageSchema = new Schema(
    {
        title: String,
        description: String,
        author: String,
        authorURL: String,
        imageURL: String,
        license: String,
        licenseURL: String,
        dateCreated: String,
        dateAccessed: String,
    },
    { retainKeyOrder: true },
);

DinosaurImageSchema.plugin(mongooseHidden, {
    hidden: { _id: true, __v: true, createdAt: true, updatedAt: true },
});

const DinosaurImage = model('DinosaurImage', DinosaurImageSchema);

module.exports = {
    DinosaurImageSchema,
    DinosaurImage,
};
