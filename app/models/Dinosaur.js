const mongoose = require('mongoose');
const mongooseHidden = require('mongoose-hidden')();
const AutoIncrement = require('mongoose-sequence')(mongoose);

const { Schema, SchemaTypes, model } = mongoose;
const { ClassificationInfo } = require('./ClassificationInfo');
const { DinosaurImage } = require('./DinosaurImage');
const { DinosaurSource } = require('./DinosaurSource');

const DinosaurSchema = new Schema(
    {
        id: Number,
        name: { type: String, unique: true, index: true },
        temporalRange: String,
        diet: { type: String, index: true },
        locomotionType: { type: String, index: true },
        description: String,
        classificationInfo: {
            type: SchemaTypes.ObjectId,
            ref: ClassificationInfo,
            required: true,
            index: true,
        },
        image: {
            type: SchemaTypes.ObjectId,
            ref: DinosaurImage,
            required: true,
            autopopulate: false,
            index: true,
        },
        source: {
            type: SchemaTypes.ObjectId,
            ref: DinosaurSource,
            required: true,
            index: true,
        },
    },
    { timestamps: true },
    { retainKeyOrder: true },
);

DinosaurSchema.plugin(AutoIncrement, { inc_field: 'id' });
DinosaurSchema.plugin(require('mongoose-autopopulate'));

DinosaurSchema.plugin(mongooseHidden, {
    hidden: { _id: true, __v: true, createdAt: true, updatedAt: true },
});

DinosaurSchema.statics.findAllDinosaurs = function (page) {
    const limit = 50;
    return this.find({})
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('classificationInfo image source')
        .exec();
};

DinosaurSchema.statics.findById = function (id) {
    return this.findOne({ id }).populate('classificationInfo image source').exec();
};

DinosaurSchema.statics.findByName = function (name) {
    return this.findOne({ name }).populate('classificationInfo image source').exec();
};

DinosaurSchema.statics.findByDiet = function (diet) {
    return this.find({ diet }).populate('classificationInfo image source').exec();
};

DinosaurSchema.statics.findByLocomotion = function (locomotionType) {
    return this.find({ locomotionType }).populate('classificationInfo image source').exec();
};

DinosaurSchema.statics.returnRandomDinosaurs = function (count) {
    return this.aggregate([
        {
            $sample: { size: count },
        },
        {
            $lookup: {
                from: 'classificationinfos',
                let: { classificationInfoId: '$classificationInfo' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$_id', '$$classificationInfoId'] },
                        },
                    },
                    { $project: { _id: 0, __v: 0 } },
                ],
                as: 'classificationInfo',
            },
        },
        {
            $lookup: {
                from: 'dinosaursources',
                let: { sourceId: '$source' },
                pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$sourceId'] } } }, { $project: { _id: 0, __v: 0 } }],
                as: 'source',
            },
        },
        {
            $lookup: {
                from: 'dinosaurimages',
                let: { imageId: '$image' },
                pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$imageId'] } } }, { $project: { _id: 0, __v: 0 } }],
                as: 'image',
            },
        },
        {
            $unwind: '$classificationInfo',
        },
        {
            $unwind: '$source',
        },
        {
            $unwind: '$image',
        },
        {
            $project: {
                _id: 0,
                __v: 0,
            },
        },
    ]);
};

DinosaurSchema.statics.returnDinosaursByQuery = function (query) {
    return this.aggregate([
        {
            $lookup: {
                from: 'classificationinfos',
                localField: 'classificationInfo',
                foreignField: '_id',
                as: 'classificationInfo',
            },
        },
        { $unwind: '$classificationInfo' },
        { $match: query.$match },
        {
            $lookup: {
                from: 'dinosaursources',
                localField: 'source',
                foreignField: '_id',
                as: 'source',
            },
        },
        { $unwind: '$source' },
        {
            $lookup: {
                from: 'dinosaurimages',
                localField: 'image',
                foreignField: '_id',
                as: 'image',
            },
        },
        { $unwind: '$image' },
        {
            $project: {
                name: 1,
                temporalRange: 1,
                diet: 1,
                locomotionType: 1,
                description: 1,
                classificationInfo: 1,
                source: 1,
                image: 1,
            },
        },
        {
            $project: {
                _id: 0,
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                classificationInfo: {
                    _id: 0,
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0,
                },
                source: {
                    _id: 0,
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0,
                },
                image: {
                    _id: 0,
                    __v: 0,
                    createdAt: 0,
                    updatedAt: 0,
                },
            },
        },
    ]);
};

DinosaurSchema.statics.findAllImages = function (page) {
    const limit = 50;
    return this.find({}, 'image')
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('image')
        .exec();
};

DinosaurSchema.statics.findImageById = function (id) {
    return this.findOne({ id }).select('image').populate('image').exec();
};

DinosaurSchema.statics.returnRandomImages = function (count) {
    return this.aggregate([
        {
            $sample: { size: count },
        },
        {
            $lookup: {
                from: 'dinosaurimages',
                let: { imageId: '$image' },
                pipeline: [{ $match: { $expr: { $eq: ['$_id', '$$imageId'] } } }, { $project: { _id: 0, __v: 0 } }],
                as: 'image',
            },
        },
        {
            $unwind: '$image',
        },
        {
            $project: {
                image: 1,
                _id: 0,
            },
        },
    ]);
};

DinosaurSchema.statics.findAllNames = function () {
    return this.find({}, 'name').exec();
};

DinosaurSchema.statics.findAllDiets = function () {
    return this.aggregate([
        {
            $group: {
                _id: { diet: '$diet' },
                count: { $sum: 1 },
            },
        },
    ]);
};

DinosaurSchema.statics.findAllLocomotions = function () {
    return this.aggregate([
        {
            $group: {
                _id: { locomotionType: '$locomotionType' },
                count: { $sum: 1 },
            },
        },
    ]);
};

const Dinosaur = model('Dinosaur', DinosaurSchema);

module.exports = {
    DinosaurSchema,
    Dinosaur,
};
