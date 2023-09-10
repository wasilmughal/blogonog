import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectlink} from "@/app/lib/db"
import {users} from "@/app/lib/model/user"
export async function POST(request,content){

    await mongoose.connect(connectlink).then(async(res)=>{
        console.log("user post")
    })

    const body = await request.json()

    const cheak =await users.findOne({email:body.email})

   if(cheak==null){

    const res =users(body)

const result =await res.save()



    return NextResponse.json({

        data:result,
        message:"sussces"
    })

   }else{
    return NextResponse.json({
        data:cheak,
        message:"user already regsister"
    })
   }


}