"use client";
// import Employee from "@/models/employeeModal";
// import { connect } from "@/db/dbConnection";
import {ToastContainer,toast} from 'react-toastify';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
import {useRouter} from 'next/navigation';


export default function DeleteEmployee(props){
    const router = useRouter();
    const deleteSingleEmployee=async(req,res)=>{
        const result = await axios.delete("api/employees/"+props.id);
        const success =result.data.success;
        if(success){
            console.log(result.data.message);
            // toast(result.data.message);
            // alert("Employee deleted successfully");
            // router.push("/");
        }else{
            toast(result.data.error);
        }

    }
    return <button onClick={deleteSingleEmployee}>Delete</button>
}