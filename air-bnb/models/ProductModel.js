const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        category: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Category',
            required:true
        },
        room:{
            type:String,
            enum:["available","unavailable"],
            default:"available"
        },
        entireHome:{
            type:String,
            enum:["available","unavailable"],
            default:"unavailable"
        },
        bedrooms:{
            type: Number,
            required:true
        },
        beds: {
            type: Number,
            required:true
        },
        bathrooms: {
            type: Number,
            required:true
        },
        price: {
            type: Number,
            required: true
        },
        propertyType:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Property",
            required:true
        },
        maxPerson:{
            type:Number,
            require:true
        },
        region:{
            type:String
        },
        country:{
            type:String
        },
        location:{
            type:String,
            default:"none"
        },
        CheckIn:{
            type:Date
        },
        CheckOut:{
            type:Date
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);