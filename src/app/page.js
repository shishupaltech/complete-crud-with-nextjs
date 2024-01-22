"use client";
import {ToastContainer,toast} from 'react-toastify';
import Image from 'next/image';
import axios from 'axios';
import { useEffect, useState } from "react";
import DeleteEmployee from '@/lib/DeleteEmployee';
import Loader from './[employeeid]/Loader';
// import {ToastContainer,toast} from 'react-toastify';
export default function Home() {
  const[employees,setEmployees]= useState([]);
  const[loader,setLoader]= useState(true);
  
  useEffect(()=>{

    (async()=>{
          const data = await axios.get("api/employees");
          // const employee = await data.json();
          // console.log(data);
          const employee = data.data.employees;
          // console.log("Employee Data",employee);
          // console.log(data.data.employeeData);
          setEmployees(employee);
          setLoader(false);
        })();
  },[])
  // console.log(employees);
  // console.log("Employees:",employees.name);
  // console.log("Employees:",employees.email);
  // console.log("Employees:",employees.contact);
  // console.log("Employees:",employees.contact);
  const handleDelete=(deleteId)=>{
    console.log(deleteId);
    const updateEmployees = employees.filter(employee=>employee._id!==deleteId);
    setEmployees(updateEmployees);
    setLoader(false);
  }
  return (
    <div>
      {loader && <Loader/>}
      {
        !loader &&

    <main className="flex min-h-screen flex-row flex-wrap gap-4 ml-6 my-6">
    <ToastContainer/>
      { employees && 
        employees.map((index)=>(
          // <Image src={index.profileImg} alt='profile-img' width={200} height={200}/>
          

<div className="max-w-sm max-h[400px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={index._id}>
    <a href="#">
    <Image className='rounded-lg' src={index.profileImg} alt='profile-img' width={400} height={200}/>
    </a>
    <div className="p-5">
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{index.name}</h5>
        </a>
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{index.email}</h5>
        </a>
        <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{index.contact}</h5>
        </a>
        
        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={()=>handleDelete(index._id)}>
          
          <DeleteEmployee id={index._id} />
            
        </div>
        <a href={"/"+index._id} className="inline-flex items-center ml-3 px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
            Update
             
        </a>
    </div>
</div>

          
        ))
      }
      
    </main>
      }
    </div>
  );
}
