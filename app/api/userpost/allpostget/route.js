import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectlink} from "../../../lib/db"
import {userpost} from "../../../lib/model/userpost"

export async function GET(){

    await mongoose.connect(connectlink)
const alldata=await userpost.find()
    return NextResponse.json({

        data:alldata,
        message:"data get"

    })
}