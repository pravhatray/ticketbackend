const mongoose=require("mongoose")

const connect=()=>{
    return mongoose.connect("mongodb+srv://pravhatray:pravhat@cluster0.owoykwh.mongodb.net/ticket")
}

module.exports=connect