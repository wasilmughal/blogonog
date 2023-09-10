"use client"
import React from 'react'
import { FcLike } from 'react-icons/fc';
import { AiOutlineMore } from 'react-icons/ai';

function page() {
  return (
    <div>
      
      <div class=" bg-gray-50 dark:bg-gray-900 flex items-center justify-center " >
  <div class="px-5 py-1 mt-10 bg-white dark:bg-gray-800 shadow rounded-lg max-w-lg w-screen">
  {/* <button className='float-right mt-3' ><i><AiOutlineMore/></i></button> */}
  <Dropdown >
      <DropdownTrigger>
        <Button 
          variant="bordered" 
       className='float-right mt-3'  >
<AiOutlineMore/>        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]} className='bg-white ml-3 border-2 border-solid rounded-md  w-17'>
       
        <DropdownItem className='text-zinc-900 text-xs' key="edit">Edit</DropdownItem>
        <DropdownItem key="delete" className="text-red-700 text-xs" color="danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <div class="flex mb-4">
      {/* <img class="w-8 h-8 rounded-full" src="	http://localhost:3000/_next/image?url=%2F_next%2Fs…view__5_-removebg-preview.91e629a5.png&w=256&q=75" alt='..'/> */}
      <div class="ml-2 mt-0.5">

        <span class="block font-medium text-base leading-snug text-black  font-serif">wasil</span>
        <span class="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">10-12-13</span>
      </div>
    </div>

    
    
    <h1 class="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal">working</h1>
    <p className='font-serif text-sm'>chak chak chak</p>

    <img src="https://plus.unsplash.com/premium_photo-1687686677012-0ddda8f06f0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="" className='w-screen object-contain ' />
    <hr className='mt-2' />
    <div class="flex justify-between items-center mt-5">
    <div class="flex ">

      <span class="ml-1 text-gray-500 dark:text-gray-400  text-2xl mb-1"><FcLike/></span>
    </div>  
    <div class="ml-1 text-gray-500 dark:text-gray-400 font-light"> comments</div>
    </div>
  </div>
</div>  


<br />
<Dropdown >
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Open Menu
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]}>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>



    <h1></h1>

    {/* <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
       className='float-right mt-3'  >
<AiOutlineMore/>        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Example with disabled actions" disabledKeys={["edit", "delete"]} className='bg-white ml-3 border-2 border-solid rounded-md  w-17'>
       
        <DropdownItem className='text-zinc-900 text-xs' key="edit">Edit</DropdownItem>
        <DropdownItem key="delete" className="text-red-700 text-xs" color="danger">
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown> */}
    </div>
  )
}



export default page
