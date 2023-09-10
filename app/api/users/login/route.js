import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectlink} from "@/app/lib/db"
import {users} from "@/app/lib/model/user"
export async function POST(request,content){

    await mongoose.connect(connectlink)

    const body = await request.json()

    const cheak =await users.findOne({email:body.email})

    if(cheak != null){
if(cheak.password==body.password){
    return NextResponse.json({
        data:cheak,
        message:"login"
    }) 
}
else {
    return NextResponse.json({
        data:[],
        message:"password incorrect"
        
    })
}

    }else{
        return NextResponse.json({
            data:[],
            message:"user not found"
        })
    }


}