
import mongoose from "mongoose";

const defineScema = mongoose.Schema({
    imagelink:String,
    title:String,
    bio:String,
    useruid:String,
    name:String,
    date:{
        type: Date,
        default: Date.now
      },
})
if( mongoose.models["userposts"]){
    delete  mongoose.models["userposts"]

}

export const userpost = mongoose.model("userposts",defineScema)