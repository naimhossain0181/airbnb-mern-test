const mongoose =require("mongoose")

const PropertySchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    icon:{
        type: String,
        require: true
    }
})

module.exports=mongoose.model("Property",PropertySchema)