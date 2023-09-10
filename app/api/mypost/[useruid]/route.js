import mongoose from "mongoose";
import { NextResponse } from "next/server";
import {connectlink} from "../../../lib/db"
import { userpost} from "../../../lib/model/userpost"
// import {users} from "../../../lib/model/user"
export async function GET(request,content) {
    console.log(content.params.useruid)

    await mongoose.connect(connectlink).then((val) => {
        console.log("test connect")
    })

    let checkuser = await  userpost.find({ useruid: content.params.useruid })

    console.log(checkuser)

    if(checkuser!=null){
        return NextResponse.json({
            data: checkuser,
            message: "GET Your RES"
        })

    }
    else{
        return NextResponse.json({
            data:[],
            message: "Not add any res"
        })
    }
}

// export async function PUT(request,content){
//     const id = content.params.useruid

//   const  body =await request.json()

// await mongoose.connect(connectlink)

// const filter = {_id:id}



// const res = await users.findOneAndUpdate(filter,body)


// return NextResponse.json({
//     data:res
// })
// }


export async function PUT(request,content){
    const id = content.params.useruid
   const  body =await request.json()

    await mongoose.connect(connectlink).then((val) => {
        console.log("test connect")
    })
    const filter = {_id:id}
    const res = await userpost.findOneAndUpdate(filter,body)

    return NextResponse.json({
data:res
    })

}


export async function DELETE(request,content){
    const id = content.params.useruid
    await mongoose.connect(connectlink).then((val) => {
        console.log("test connect")
    })
    const filter = {_id:id}
    const res = await userpost.deleteOne(filter)

  
    return NextResponse.json({
        data:res
    })
}