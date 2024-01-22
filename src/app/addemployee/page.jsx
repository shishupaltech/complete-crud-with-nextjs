"use client";
import React, { useEffect } from 'react'
import styles from './addemployee.module.css';
import Image from 'next/image';
import { useState,useRef } from 'react';
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const page = () => {
    const[showImageBox,setShowImageBox]=useState(false);
    const[loader,setLoader]= useState(true);
    const[base64,setBase64] =useState('');
    const[user,setUser] = useState({
        name:"",
        email:"",
        contact:"",
        porfileImg:""
    })
    const handleChange = async (event) => {
      let inputImage =document.querySelector("input[type=file]").files[0];
      if (event.target.files && event.target.files[0]) {
        const selectedFile = event.target.files[0];
        const base64 = await toBase64(selectedFile);
      //   console.log(i);
        setShowImageBox(true);
        setBase64(base64);
        setUser({...user,porfileImg:base64});
    //   setUser((preUser)=>({
    //       ...preUser,
    //       porfileImg:selectedFile
    //   }))
      //   console.log(user,"shishupal");
  
  
      }
    };
    // method for base64 
    // console.log(base64);
    // console.log(user);
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
      
          fileReader.readAsDataURL(file);
      
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
      
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      };
    const handleSubmit = async()=>{
        try {
            console.log(user);
            const formData = new FormData();
            formData.append("name",user.name);
            formData.append("email",user.email);
            formData.append("contact",user.contact);
            formData.append("profileImg",user.porfileImg);
            // formData.append("profileImg.size",user.porfileImg.size);
            // formData.append("profileImg.type",user.porfileImg.type);
            // formData.append("profileImg.name",user.porfileImg.name);
            // formData.append("profileImg.lastModified",user.porfileImg.lastModified);

            console.log(formData);
            const response = await axios.post("/api/employees",formData);
            const data = await response.data;
            if(data.success){
            toast("Employee Store Successfully");
            setUser({
                name:'',
                email:'',
                contact:'',
                porfileImg:''
            })
            setShowImageBox(false);
            console.log("Employee Store Successfully",response.data);
            }else{
                toast("Failed to Store Employee !!!");
                console.log("Failed to store Employee",data.message);
            }
            
        } catch (error) {
            console.log("Employe Store Failed",error);
        }
    }
  const hiddenFileInput = useRef(null);

  return (

        
            <div  className={styles.container}>
        <ToastContainer/>
        <div className={styles.input}>
            <label htmlFor="name">Name</label>
            <input 
            type="text"
             id='name'
             value={user.name} 
             onChange={(e)=>setUser({...user,name:e.target.value})}
            />
        </div>
        <div className={styles.input}>
            <label htmlFor="email">Email</label>
            <input 
            type="text"
             id='email'
             value={user.email} 
             onChange={(e)=>setUser({...user,email:e.target.value})}
            />
        </div>
        <div className={styles.input}>
            <label htmlFor="name">Contact</label>
            <input 
            type="text"
             id='contact'
             value={user.contact} 
             onChange={(e)=>setUser({...user,contact:e.target.value})}
            />
        </div>
        <div className={styles.image} onClick={()=>hiddenFileInput.current.click()}>
            <label htmlFor="profile" className={styles.inputTag}>
                Choose Profile
                <i className="fa fa-2x fa-camera"></i>
                <input 
                    type="file"
                    accept="image/*"
                    id='file'
                    ref={hiddenFileInput}
                    onChange={handleChange}
                />
                <br/>
            </label>
           {/* { showImageBox&& <img src={user.porfileImg && URL.createObjectURL(user.porfileImg)}/>} */}
           {
            setShowImageBox && user.porfileImg &&
                 <Image src={user.porfileImg} width={300} height={400} alt="Uploaded Image" />
            }
        </div>
        <div className={styles.btns}>
            <button onClick={handleSubmit}>Submit</button>
        </div>
       
            </div>
      
  )
}

export default page