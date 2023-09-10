"use client"
import React ,{useEffect, useState, useMemo}from 'react'
import logo from "../../image/image-removebg-preview__5_-removebg-preview.png"
import Image from "next/image"
import Link from 'next/link'
import axios from "axios"
import { Dropdown,initTE,Ripple} from "tw-elements";
import { useRouter } from "next/navigation"
import './loder.css'
import { FcLike } from 'react-icons/fc';
import { AiOutlineMore } from 'react-icons/ai';


function front() {
let router =useRouter()
const [my,setmy]=useState(false)
const [mydata,setmydata]=useState([])
const [showModal, setShowModal] = useState(false);
const [showModal2, setShowModal2] = useState(false);
const [name,setname]=useState("")
const [uid,setuid]=useState("")
const [ck,setck]=useState([])
const [eidtid,seteidtid]=useState()
const [title,settitle]=useState("")
   const [bio,setbio]=useState("")
   const [img,setimg]=useState("")
   const [data,setdata]=useState([])

  const [inp,setinp]=useState({
    title:"",
    bio:"",
    image:""
    
    
  })

  // useEffect start 
  useEffect(()=>{
    
initTE({ Dropdown,Ripple });
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'http://localhost:3000/api/userpost/allpostget',
  headers: { }
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  if(response){
    setdata(response.data.data)
    spacfic()
  }
})
.catch((error) => {
  console.log(error);
});
 },[ck])
  // useEffect and

  // single data get start

  const spacfic=()=>{
const getid = localStorage.getItem("useruid")
let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://localhost:3000/api/users/get/${getid}`,
    headers: { }
  };
   axios.request(config)
  .then((response) => {
    console.log(response.data);
    if(response){
      setname(response.data.data.name)
      setuid(response.data.data._id)
}
  })
  .catch((error) => {
    console.log(error);
  });  
}

  // single data get and
//  User bolg post start 
  const post=()=>{
let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/userpost/mypost',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        imagelink:inp.image,
        title:inp.title,
        bio:inp.bio,
        name:name,
        useruid:uid
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if(response){
        setck(response)
        setShowModal(false)
      }})
    .catch((error) => {
      console.log(error);
    });
    }
//  User bolg post and 
//  user profile data start 
   const myprofile=()=>{
    const useruidget =localStorage.getItem("useruid")
    initTE({ Dropdown,Ripple });
setmy(true)
let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `http://localhost:3000/api/mypost/${useruidget}`,
  headers: { }
};

axios.request(config)
.then((response) => {
if(response){
  setmydata(response.data.data)
}
})
.catch((error) => {
  console.log(error);
});
}
//  user profile data and 

 
//  single post get for eidt  start 
   const edit=()=>{
    setShowModal2(true)

for (const i of mydata) {
 if(eidtid==i._id){
settitle(i.title)
setbio(i.bio)
setimg(i.imagelink)
 }

}
}
//  single post get for eidt and

// user blog edit start 
   const del=(e)=>{
 let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/mypost/${e}`,
      headers: { }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      if(response){
        setShowModal2(false)

      }
    })
    .catch((error) => {
      console.log(error);
    });       }
 // user blog edit and
 
//  edit user blog start 
    const editpost=()=>{
 let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost:3000/api/mypost/${eidtid}`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : {
        imagelink:img,
        title:title,
        bio:bio
      }
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

    }
    //  edit user blog start 

  return (
    <>
     
  
{/* header start */}

      <div className="fixed top-0  flex w-full flex-wrap items-center  bg-gray-300 text-neutral-500  hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 " >
  <nav className="container p-5 flex  flex-col md:flex-row items-center " >
  <a href="#" className="flex items-center  text-2xl font-semibold text-gray-900 dark:text-white">
      <Image src={logo} alt="logo" className="w-8 h-8 mr-2"/>

      Poetbook  
      </a>
    <div className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l  md:border-gray-400	flex flex-wrap items-center text-base justify-center">
      
      <Link href="" className="mr-5 hover:text-gray-900">My Post</Link>
      <button type='button'  className="mr-5 hover:text-gray-900" onClick={() => setShowModal(true)}>+Add Post</button>
      <Link href=""></Link>


    </div>

    <a
        class="hidden-arrow  flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-te-dropdown-toggle-ref
        aria-expanded="false">
        <img
          src="data:image/png;base64,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"
          class="rounded-full w-10 h-10"
          
          alt="Avatar"
          loading="lazy" />
        <span class="w-2 pl-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5">
            <path
              fill-rule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clip-rule="evenodd" />
          </svg>
        </span>
      </a>
      <ul
        class="absolute left-0 right-auto z-[1000] float-left m-0 hidden min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-zinc-700 [&[data-te-dropdown-show]]:block"
        aria-labelledby="dropdownMenuButton2"
        data-te-dropdown-menu-ref>
        <li>
          <a
          onClick={()=>myprofile()}
            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
            href="#"
            data-te-dropdown-item-ref >My profile</a>
        </li>
        
        <li>
          <a
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
            href="#" 
            onClick={()=>router.push("/")}
            data-te-dropdown-item-ref>Logout</a>
        </li>
      </ul>

    
  </nav>
</div>

{/* header and */}

{/* user post modal start */}
{showModal ? (
        <>
          <div
            className="justify-center  backdrop-blur-sm items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <p class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <Image src={logo} alt="logo" className="w-8 h-8 mr-2"/>

      Poetbook  
      </p>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <p className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </p>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form>
  <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="title" onChange={(e)=>setinp({...inp,[e.target.name]:e.target.value})} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="bio" onChange={(e)=>setinp({...inp,[e.target.name]:e.target.value})} id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What,s on your mind ?</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="image" onChange={(e)=>setinp({...inp,[e.target.name]:e.target.value})} id="image" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
      <label  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">image</label>
  </div>
  
  
</form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=> setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    type="button"
                    onClick={() =>post()}
                  >
                    Post Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
{/* user post modal and  */}

 {/* user edit modal start */}

  {showModal2 ? (
        <>
          <div
            className="justify-center  backdrop-blur-sm items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <p class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
      <Image src={logo} alt="logo" className="w-8 h-8 mr-2"/>

      Poetbook  
      </p>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal2(false)}
                  >
                    <p className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      x
                    </p>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form>
  <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="title" value={title} onChange={(e)=>settitle(e.target.value)} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Title</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="bio" value={bio} onChange={(e)=>setbio(e.target.value)} id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
      <label for="floating_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What,s on your mind ?</label>
  </div>
  <div class="relative z-0 w-full mb-6 group">
      <input type="text" name="image" value={img} onChange={(e)=>setimg(e.target.value)} id="image" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="" required />
      <label  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">image</label>
  </div>
  
  
</form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={()=> setShowModal2(false)}
                  >
                    Close
                  </button>
                  <button
className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    type="button"
                    onClick={()=>editpost()}
                  >
                    Post Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
{/* user eidt modal and  */}

{/* hader All word  complet*/}

<div className='bg-gray-50'>
 

<br />
<br />
<br />

{
  my ?
  <>
  
<button variant="text" className="fixed flex items-center gap-2 rounded-lg text-sm px-5 py-2.5 text-center mt-5 mr-2 mb-2" onClick={()=>setmy(false)}>
        See All Post
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
      
{
  mydata.length!=0?
  <>
  <div class=" w-screen overflow-hidden shadow-xl max-w-lg mx-auto mt-7 bg-blue-500">
    <div class="flex justify-center mt-8">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAAB3CAMAAAAO5y+4AAABAlBMVEXL4v////++2Pv/3c5KgKo2Xn3/y75AcJP0+/8rTWbigIbk9v/dY2671vvN5P/U6///18kyWHVIbIs9XHXi4Ov5///r/f/F3f3m8f8rVnbv9v/k/v85Y4P7zcTk+f/c6v363dPic3n/5NN/nLmKrtF0ncLieoBFeJ87eKXaxb7Etrapo6eTlp6Ij5pSYHLa4fLMzdiWp7YSS3DV5Ou6x9Cuy+l0kahXeJPkz9a80uDjo6prj7GHo7edtMPk6/Dlxs2weIbMeYOacIJOYX0ZQVyZs81fcYWfj5HatK6JgYlob3ywm5vs3+Hx09L67OjlusHik5rcVmNkZH4eXoeHb4O0b35CvfloAAAIDUlEQVRogbXbe0PTSBAA8CW0JCBukLNNU2IpUCiegkJpQymtele4F+edqN//q9zmsck+ZjYby81fVkx/zszuZvOArNUNr9vZ92ngpBEEZH+/0/Vqfwup9a+7HUp4BDn9PAmH7Hdq4fauJ5iqnfJOsN99ahdCc9pxBNuatnK7GArRpPNEbocGRlaRHZZ0dasrXQuVEKrIzv6KrpUKyhXVNrqerZrJjlxt4wgzufs11FQOZJn+kNuth2ZhXWzUrZssBDvP0fGFuJ55xppC6TIypWC3YqGoAzvw8ALdzgoq0WoNNhlyV2S1cQ01GXA7+IiieNSEdRcfyNQPjuLdphrhcrkZj/16sObirD+OL8NQY5svNlksJ/Vg1UWLTOkEMAt3c3knz4EKmNiyJEbY3N18ocw986iWXXRtNLDcXY4V2JHhLu7iq5R/hLKFe6ceLcOOh7ooS8c4W7gT3/elb1AqHWDuPsYSf1btbi7jye1YnMimQS24+ImPBga2cJm8XE4kGG+x4KIsoXd2bpq0NI+VFkMuXmVzmWVXHl74DqRwPcN53o8NrOJuSgmjlS5c0xnX1xdl3P1JKrScsBOoruEktJKrrh4dxTVuMEo3bO7uqueGF8vl+fnmEnGRoUUs0i3d8Ox1v//6zX0UlhHd//b7q43f/1giLjyJiUW6hRueHa6zODzsv/75zduzs7O3b35+3V/fSGKHw6oLJ0ws0i3d/jqPQx7r6zsbWWAueGIiFukWbny4DkTu7pwjrpJwULrdij06d++N7p92bpYwsUh3VVeBCXe9CvaJ3XTRStzK/XLuhm9M7sZfS8wFphKxKDNzk6UivIfU0t04X1q56cgiFmVm54Xd3d37t/0Kd+O3cxb3uqucHZJLJmJ1WZKIh2CRJTeNV8DxeqGJRZkzF43ablJoYtpnPJmrby2J1f2EVV319N9hrs1V58r5ag0mNu19apctWcSmvau72smQVM9eFi9ruNcW7nOP2N2mejBkLLmv/gaP1/aVxPZmxjsr9yUyWtSNdMfapWjGgvsKG6TapRIxXCbIYeWiR/+4+2Dhws3VXSe5krcMdEwL7sv/wUUHluC+ww+X3cDeRRtsU2Zt4bBW8YRtyryKiyRclhkfzau5cMJW3dXdOneaoam0Y9Xd1Vyo0nZVXmU8E2ixLNO1f5aXttd6vcpChS2zXdlVelz0tqps2vpc+6b+A8A+VB61uluu07y3O+umBQN0O5b7Dcjl14Hsj5Wuvt+w2l/BLov8j9X5Kq5nt58EXSHquo7l/nllF9g/1x1YT+Cm1wu1Bhb1g/eA+z7wjWXTb4/aXQ8WKjlqLj5r7OdF84gYZaW9nuX1L8/1KLy8aHkq3PdaF5ehSQavf+0aTGlw1Aybl6OW5/UV1muNLtnPjtBqg9f7NjM4yTVKbq5EXhISnP5NlNx4iRAZvr9RXegk11RthpNWyqhsK3uIl+RM9a+D7+dUFJoydcDvOYcXmVvCa5l7wf9BOAioSiP3rwyFTtFZo7jTHc5zd40P5exja17+k8ZMpbVZZL4/SanvDGanp42GW3zpVe7mgzpnvdZV4bqNBjtk4PglrS5Wpvux1PfHgwYz09DdFO57upsfwehxnrWSbnk/Vk+Y+uPjAm2UCQsugwtWcN3yoNPG8TgZ3/qowu630/FMQIWERbf1uQW48mGnszH8lBB6vkDpoKGGq4wrRj2c/FN+4OPK1Y4cKLMIf55Cj0+1o4fKPPJa19vbX26KT3weDfX/8QxIF3p+5ANs4ebrhtf68GWbwf/yjxPcdY8DLV3geRkdA2wxsOJe5twkLIO3MrfHnyBqdR66bjRQBvMa8HyQUogd8lnSzNx/MzaJzC1+ribsJqEMZtHlcxgYUyJ7OXrGoluo21u95C/Y+QiGU9Y9Fpcq2eXPfynAFssGc6dtxvQWPN8vifqsfVW60kwaZm6eMPT8N993gN0t022Gt4n7bO867+/LNN32rfCsUkw4Z6OxNKhkN91o0TuovYI7SRN8tnezfXBwsP3PXvZRfLtDZ113IFdZf5+BHkN1jspvbWZQ7/pka2vr5LqXfRR+HulVdtM5jL3PkI5p2BUKfTntZfmm7k2ab28qtFcosyu6zyVKfV8FdoWEeYO3sthT2xtBbJov/r4KazHiCgnHaYaLk5Q9WaTZx1C6ruSa3s9JtjywKyY8YlTvQ+5+SD6MoHSHkmt+H4nBiFvC4bzN25s3uF1uchDWnVW8f7W2Bs4jqdIxS3HvJO/vCXN7ZZmHMPt1rjL6+3UYXOyxmqNeb3GQuweLXm9U/MRF2FtNAd4nxGBeaVZo3t60wWWZI4TVsoXfn5wiMM9qt713s8XjZq9dvN1hz8LviyIwb3E4bW+V0Z7ydIcg615BBPx+7KgBynyTdVu0N2nwrbK1klV3BArI+8ALaK9TwFHR3qTBkYmdLWAAff8ZHl258VGo80eJVVp7gX09/r73O7DWGfwo5PsoDmWltVP02w3vt7duUTj8VLifwpKtnLVWLuuyetVQwN+K+fsNYb/G8ICycdmMAoqdwkW+IWdlFZ491u6aN9flBP4lZ3/J2Xqqze+neFdataMy4YxVKnz1BL+fwqI1PT49VeAwm0ofWZmH8nCa4IO4pstiMZ9JdNT8NXV/ZRO3jMiN58g68YMui9F41ijtKEn45HsosvHcOIR/0GWxeD9P7FSPHtm2/THiAymev/+ffr+MR/fd9O5oErvR9+3vUTyb3M6vRva/V8bjP3Q0H8wFyv1oAAAAAElFTkSuQmCC" class="rounded-full border-solid border-white border-2 -mt-3"/>		
    </div>
	<div class="text-center px-3 pb-6 pt-2">
		<h3 class="text-white text-sm bold font-sans">{name}</h3>
		<p class="mt-2 font-sans font-light text-white">Hello, i'm {name}</p>
	</div>
  
</div>
  </>:
  null
}


{
  mydata.length==0 ?
  <>
  <br />
  <br />
  
 <div class="loader">
  <div class="justify-content-center jimu-primary-loading"></div>
</div>
<br />
<br />
  
  </>
  :<>
  
  {
  mydata.map((v,i)=>{

return(

  <>
  
 <div class=" bg-gray-50 dark:bg-gray-900 flex items-center justify-center " >
  <div class="px-5 py-1 mt-10 bg-white dark:bg-gray-800 shadow rounded-lg max-w-lg w-screen">
  {/* button start */}

  <div
        className="hidden-arrow float-right mt-3 flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-te-dropdown-toggle-ref
        aria-expanded="false">
        <span class="w-2 pl-1 ">
          <i className='float-right mt-3' onClick={()=>seteidtid(v._id)}>        <AiOutlineMore/>
</i>
        </span>
      </div>
      <ul
        class="absolute left-0 right-auto z-[1000] float-left m-0 hidden min-w-[10rem] list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-zinc-700 [&[data-te-dropdown-show]]:block"
        aria-labelledby="dropdownMenuButton2"
        data-te-dropdown-menu-ref>
        <li>
          <button
          onClick={()=>edit()}
            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
            data-te-dropdown-item-ref >Edit</button>
        </li>
        
        <li>
          <button
          class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-gray-700 hover:bg-gray-100 active:text-zinc-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-gray-400 dark:text-gray-200 dark:hover:bg-white/30"
            href="#" 
            onClick={()=>del(v._id)}
            data-te-dropdown-item-ref>delete</button>
        </li>
      </ul>

  {/* button and  */}

    <div class="flex mb-4">
      <Image class="w-8 h-8 rounded-full" src={logo} alt='..'/>
      <div class="ml-2 mt-0.5">
        <span class="block font-medium text-base leading-snug text-black  font-serif">{v.name}</span>
        <span class="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">{v.date}</span>
      </div>
    </div>

    
    
    <h1 class="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal">{v.title}</h1>
    <p className='font-serif text-sm'>{v.bio}</p>

    <img src={v.imagelink} alt="" className='w-screen object-contain ' />
    <hr className='mt-2' />
    <div class="flex justify-between items-center mt-5">
    <div class="flex ">

      <span class="ml-1 text-gray-500 dark:text-gray-400  text-2xl mb-1"><FcLike/></span>
    </div>  
    <div class="ml-1 text-gray-500 dark:text-gray-400 font-light"> comments</div>
    </div>
  </div>
</div>  
  
  </>
)

  })
}
  </>
}




  </>
  :
  <>

{
  data.length==0 ?
  <>
   <div class="loader">
  <div class="justify-content-center jimu-primary-loading"></div>
</div>
  </>
  :<>
  {
  data.map((v,i)=>{
return(
<>
 <div class=" bg-gray-50 dark:bg-gray-900 flex items-center justify-center " >
  <div class="px-5 py-1 mt-10 bg-white dark:bg-gray-800 shadow rounded-lg max-w-lg w-screen">
    <div class="flex mb-4">
      <Image class="w-8 h-8 rounded-full" src={logo} alt='..'/>
      <div class="ml-2 mt-0.5">
        <span class="block font-medium text-base leading-snug text-black  font-serif">{v.name}</span>
        <span class="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">{v.date}</span>
      </div>
    </div>
    
    <h1 class="text-black dark:text-gray-100 leading-snug md:leading-normal">{v.title}</h1>
        <p className=' text-xs'>{v.bio}</p>

    <img src={v.imagelink} alt="" className='w-screen object-contain rounded-md ' />
    <hr className='mt-2' />
    <div class="flex justify-between items-center mt-5">
    <div class="flex ">

      <span class="ml-1 text-gray-500 dark:text-gray-400  text-2xl mb-1"><FcLike/></span>
    </div>  
    <div class="ml-1 text-gray-500 dark:text-gray-400 font-light">comments</div>
    </div>
  </div>
</div>  
  </>
)
  })
}
 </>
}
  </>
}
 </div>
    </>
  )
}

export default front

  