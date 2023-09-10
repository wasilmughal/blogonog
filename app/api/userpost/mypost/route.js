import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectlink} from "../../../lib/db"
import {userpost} from "../../../lib/model/userpost"


export async function POST(request,content){

    const body = await request.json()  //get data from user !

    await mongoose.connect(connectlink).then(async(res)=>{
        console.log("post user")
    })

const res =userpost(body)
const result =await res.save()

    return NextResponse.json({
        data:result,
        message:"post"
    })
}