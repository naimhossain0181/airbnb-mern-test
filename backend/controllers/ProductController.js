const CategorySchema = require("../models/CategoryModel")
const PropertySchema=require("../models/PropertyModel")
const ProductSchema=require("../models/ProductModel")

exports.CategoryAdd=async (req,res)=>{
    let newBody= new CategorySchema(
        {
            name: req.body.name,
            icon:req.body.icon
        }
    )
    try{
        const Category=await newBody.save()
        await res.status(201).json({status:"success",data:Category})
    }
    catch (e) {
        await res.status(501).json({status:"Failed",data:e})
    }

}

exports.FindAllCategory=async (req,res)=>{

    try{
        const Category= await CategorySchema.find()
        await res.status(200).json({status:"success",data:Category})
    }
    catch (e) {
        await res.status(501).json({status:"Failed",error:e})
    }
}

exports.PropertyAdd=async (req,res)=>{
    let newBody= new PropertySchema(
        {
            name: req.body.name,
            icon:req.body.icon
        }
    )
    try{
        const Property=await newBody.save()
        await res.status(201).json({status:"success",data:Property})
    }
    catch (e) {
        await res.status(501).json({status:"Failed",data:e})
    }
}

exports.FindAllProperty=async (req,res)=>{

    try{
        const Property= await PropertySchema.find()
        await res.status(200).json({status:"success",data:Property})
    }
    catch (e) {
        await res.status(501).json({status:"Failed",error:e})
    }
}


exports.AddProduct =async (req,res)=>{
    let newBody= new ProductSchema(
        req.body
    )
    try{
        const Product=await newBody.save()
        await res.status(201).json({status:"success",data:Product})
    }
    catch (e) {
        await res.status(501).json({status:"Failed",data:e})
    }
}

exports.FindProduct =async (req,res)=>{
    try{
       const products= await ProductSchema.aggregate([
           {
               $lookup: {
                   from: "categories",
                   localField: "category",
                   foreignField: "_id",
                   as: "category"
               },
           },
           {
               $lookup: {
                   from: "properties",
                   localField: "propertyType",
                   foreignField: "_id",
                   as: "propertyType"
               },
           },

           {
               $unwind: "$category",
           },
           {
               $unwind: "$propertyType",
           },
       ])

        await res.status(200).json({status:"success",data:products})

    }

    catch (e) {
        await res.status(501).json({status:"failed",error:e})
    }
}

exports.FindProductByCategory =async (req,res)=>{
    let searchBy=req.query.category
    console.log(searchBy)
    try{
        const products= await ProductSchema.aggregate([

            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                },
            },
            {
                $lookup: {
                    from: "properties",
                    localField: "propertyType",
                    foreignField: "_id",
                    as: "propertyType"
                },
            },

            {
                $match:{
                    "category.name":searchBy
                }
            },

            {
                $unwind: "$category",
                $unwind: "$propertyType"
            },
        ])

        await res.status(200).json({status:"success",data:products})

    }

    catch (e) {
        await res.status(501).json({status:"failed",error:e})
    }
}

exports.FindProductByDate =async (req,res)=>{
    let checkInDate=new Date(req.query.checkInDate)
    let checkOutDate=new Date(req.query.checkOutDate)
    let CountryName =req.query.CountryName
    let totalPerson=Number(req.query.totalPerson)
    console.log(checkInDate,checkOutDate,CountryName,totalPerson)
    try{
        const products= await ProductSchema.aggregate([
            {
                $match: {
                    "country": CountryName,
                    "maxPerson":{$gte:totalPerson}
                }
            },
            {
                $match:{

                    $or:[
                        { CheckIn: { $gt: checkOutDate } },
                        { CheckOut: { $lt: checkInDate } }
                    ]
                },
            },


        ])

        await res.status(200).json({status:"success",data:products})

    }

    catch (e) {
        await res.status(501).json({status:"failed",error:e})
    }
}


exports.FindMinMaxPrice= async (req,res)=>{
    try{
       const priceStats=await ProductSchema.aggregate([
            {
                $group:{
                    _id: null,
                    minPrice: { $min: "$price" },
                    maxPrice: { $max: "$price" }
                }
            },
            {
                $project: {
                    _id: 0,
                    minPrice: 1,
                    maxPrice: 1
                }
            }
        ])
        const minPrice = priceStats[0].minPrice;
        const maxPrice = priceStats[0].maxPrice;
        const minmax={minPrice,maxPrice}
        await res.status(200).json({ status: "success", minmax });
    }
    catch (e) {
        await res.status(501).json({status:"failed",error:e})
    }
}


exports.FiltersProducts=async (req,res)=>{
        const searchByPoperty=req.query.searchByPoperty
        const Beds=Number(req.query.Beds)
        const Bathroom=Number(req.query.Bathroom)
        const minPrice=Number(req.query.minPrice)
        const maxPrice=Number(req.query.maxPrice)
        try{
            const products= await ProductSchema.aggregate([

                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    },
                },
                {
                    $lookup: {
                        from: "properties",
                        localField: "propertyType",
                        foreignField: "_id",
                        as: "propertyType"
                    },
                },
                {
                    $unwind: "$category",
                    $unwind: "$propertyType"
                },

                {
                    $match:{
                        "propertyType.name":searchByPoperty
                    }
                },
                {
                    $match:{
                        $and:[
                            { price: { $gt: minPrice } },
                            { price: { $lte: maxPrice } }
                        ]
                    }
                },
                {
                    $match:{
                        "beds":{$gte:Beds},
                        "bathrooms":{$gte:Bathroom},
                        "propertyType.name":searchByPoperty
                    }
                },



            ])
    console.log(products)
            await res.status(200).json({status:"success",data:products})

        }
    catch (e) {
        await res.status(501).json({status:"failed",error:e})
    }
}
