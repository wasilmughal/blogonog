import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectlink} from "../../../lib/db"
import {users} from "../../../lib/model/user"

export async function GET(){
 
await mongoose.connect(connectlink).then(async(res)=>{
    console.log("get connect")
})
const res = await users.find()
    return NextResponse.json({
        data:res    
    })
}