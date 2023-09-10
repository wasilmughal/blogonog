"use client"
import { useState } from "react"
import './globals.css'
import logo from "./image/image-removebg-preview__5_-removebg-preview.png"
import Image from "next/image"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation"


export default function Home() {

  const route=useRouter()

const [loader,setloader]=useState(false)
const [show,setshow]=useState(true)

const [user,setuser]=useState({
  firstname:"",
  lastname:"",
  email:"",
  password:"",
  cpassword:""

})


const signup =()=>{


  if(user.firstname=="" || user.lastname=="" || user.email=="" || user.password==""){
    toast.warning("plaese enter data in  required fields !!",{
      autoClose:3000
    })}
    else{
      if(user.password==user.cpassword){

        setloader(true)

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'http://localhost:3000/api/users/signUp',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : {
            name:user.firstname+user.lastname,
            email:user.email,
            password:user.password
          }
        };
        
        axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if(response.data.message=="user already regsister"){
            toast.warning("already regsister",{
              autoClose:3000
            })

            setloader(false)

      
          }else{
            toast.success("Account SignUp",{
              autoClose:3000
            })
      
          
      
      localStorage.setItem("useruid",response.data.data._id)
      route.push("./component/frontpage")
          }
        })
        .catch((error) => {
          console.log(error);
        });


        
      }else{

        toast.error("plaese type same password !!",{
          autoClose:3000
        })

      }
    }


}

const login =()=>{

  if(user.email =="" || user.password==""){

    toast.warning("plaese enter data in  required fields !!",{
      autoClose:3000
    })
  }else{

 
  setloader(true)
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:3000/api/users/login',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : {
     
      email:user.email,
      password:user.password
    }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(response.data.message);
    if(response.data.message == "login"){
     
      toast.success("Account Login",{
        autoClose:3000
      })
      localStorage.setItem("useruid",response.data.data._id)
      route.push("./component/frontpage")



}else if(response.data.message=="password incorrect"){

  toast.warning("Incorrect Password",{
    autoClose:3000
  })

  setloader(false)

}else{
  toast.error("Account Not Regsister !",{
    autoClose:3000
  })
  setloader(false)

}

  })
  .catch((error) => {
    console.log(error);
  });
}
}





  return (
    <div className="bg-gray-50">


<header class="text-gray-600 body-font bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 ">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    
  <a href="#" class="flex items-center  text-2xl  font-semibold text-gray-900 dark:text-white">
      <Image src={logo} alt="logo" className="w-8 h-8 mr-2"/>

      Poetbook  
      </a>
  
  </div>
</header>



{/* header and */}


  
{
  show !=true ?
  <>


{
  loader ?
  <>
  <div class="loader">
  <div class="justify-content-center jimu-primary-loading"></div>
</div>
  </>
  :
  <>
  
  
  <div >

  <section class="bg-gray-50 dark:bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                   Login in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" onChange={(e)=>setuser({...user,[e.target.name]:e.target.value})} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" onChange={(e)=>setuser({...user,[e.target.name]:e.target.value})} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                     
                      <p  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</p>
                  </div>
                  <button type="button" onClick={()=>login()} class="w-full  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Login in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don,t have an account yet? <button type="button" className="text-blue-700" onClick={()=>setshow(true)}>Sign Up</button>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  </div>


  </>
}
  


<ToastContainer />

  
  </>
  :
  <>
{
  loader ?
  <>
  <div class="loader">
  <div class="justify-content-center jimu-primary-loading"></div>
</div>
  </>
  :
  <>
  
<div >

<section className="bg-gray-50 dark:bg-gray-900">
<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
   
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up your new account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
            <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                    <input type="text" name="firstname" onChange={(e)=>setuser({...user,[e.target.name]:e.target.value})} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First Name" required=""/>
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                    <input type="text" name="lastname" onChange={(e)=>setuser({...user,[e.target.name]:e.target.value})} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last Name" required=""/>
                </div>
                <div>
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name="email" onChange={(e)=>setuser({...user,[e.target.name]:e.target.value})} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" onChange={(e)=>setuser({...user,[e.target.name]:e.target.value})} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                <div>
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                    <input type="password" name="cpassword" onChange={(e)=>setuser({...user,[e.target.name]:e.target.value})} id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                </div>
                <div class="flex items-center justify-between">
                   
                    <p  class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</p>
                </div>
                <button type="button" onClick={()=>signup()} class="w-full  text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Sign up</button>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                    you have already account yet ? <button type="button" className="text-blue-700" onClick={()=>setshow(false)}>Login </button>
                </p>
            </form>
        </div>
    </div>
</div>
</section>
</div>
  </>
}

  
<ToastContainer />
  </>
}

    </div>
  )
}
