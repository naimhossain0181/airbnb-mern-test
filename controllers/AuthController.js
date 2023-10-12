const UserModel=require("../models/UserModel")
exports.CreateUser = async (req,res)=>{
    let newUser=new UserModel(req.body)

    try{
        const user=await newUser.save()
        await res.status(200).json({"status":"success",data:user})

    }
    catch (e) {
        await res.status(500).json({status:failed,error:e})
    }
}