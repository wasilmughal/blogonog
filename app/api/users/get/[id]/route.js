import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectlink} from "../../../../lib/db"
import {users} from "../../../../lib/model/user"



export async function GET(request,content){

    const id1= content.params.id
 
//    const uid = localStorage.getItem("useruid")
    await mongoose.connect(connectlink).then(async(res)=>{
        console.log("get One connect")
})

const id={_id:id1}
     const res = await users.findOne(id)
     return NextResponse.json({
            data:res,
            message:"get data"
        })
    }