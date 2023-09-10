
import mongoose from "mongoose";

const defineScema = mongoose.Schema({
    
    name:String,
    email:String,
    password:String
    
})
if( mongoose.models["users"]){
    delete  mongoose.models["users"]

}

export const users = mongoose.model("users",defineScema)