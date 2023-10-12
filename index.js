const express =require("express")
const mongoose =require("mongoose")
const path =require('path')
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

// 
//font-end backend run concorrently
app.use(express.static(path.join(__dirname,"./client/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'./','client','dist','index.html'))
})

//server setup
const port =process.env.PORT||3000
app.listen(port,()=>{
    console.log(`Server Connected ${port}`)
})