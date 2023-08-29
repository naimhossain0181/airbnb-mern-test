const express =require("express")
const mongoose =require("mongoose")
const routes=require("./routes/index")
const cors=require("cors")
require("dotenv").config()
const app =express()


//json configurations
app.use(express.json())

//cors setup
app.use(cors())

//mongoose setup
mongoose.connect(process.env.URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("Database connect successfully"))
    .catch((error)=>{
        console.log("data connection failed")
    })

//router setup
app.use("/v1",routes)


//server setup
app.listen(3000,()=>{
    console.log("server connected port : 3000")
})