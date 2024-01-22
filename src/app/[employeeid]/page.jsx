"use client";
import React, { useEffect, useState,useRef } from 'react'
import Image from 'next/image';
import styles from './updateemployee.module.css';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import Loader from './Loader';


const UpdateEmployee = (NextRequest) => {
  const router = useRouter();
    const employeeid = NextRequest.params.employeeid;
    // console.log(employeeid)
    const[loader,setLoader]= useState(true);
    const[showImageBox,setShowImageBox]=useState(false);
    const hiddenFileInput = useRef(null);
    const[user,setUser] = useState({
      id:"",
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
      setShowImageBox(true);
      setUser({...user,porfileImg:base64});


    }
  };
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
    useEffect(()=>{
        (async()=>{
            const singleEmployeeData = await axios.get("api/employees/"+employeeid);
            const data =singleEmployeeData.data.data;
            setUser({...user,id:data._id,name:data.name,contact:data.contact,email:data.email,porfileImg:data.profileImg});
            console.log(data);
            setLoader(false);
            console.log(singleEmployeeData);
        })();
    },[]);
    const updateEmployee = async()=>{
      try {
          console.log(user);
          const formData = new FormData();
          formData.append("id",user.id);
          formData.append("name",user.name);
          formData.append("email",user.email);
          formData.append("contact",user.contact);
          formData.append("profileImg",user.porfileImg);

          console.log(formData);
          const response = await axios.put("/api/employees",formData);
          console.log(response);
          const data = response.data;
          const message = data.message;
          console.log(data);
          if(data.success){
          // toast("Employee Updated Successfully");
          alert(message);
          router.push("/");
          setShowImageBox(false);

          console.log("Employee Updated Successfully",data);
          }else{
              toast("Failed to Store Employee !!!");
              console.log("Failed to store Employee",data.message);
          }
          
      } catch (error) {
          console.log("Employe Store Failed",error);
      }
  }
  
  return (
    <div>{loader && (<Loader/>)}
    {
     !loader && 
    <div  className={styles.container}>

        <div className={styles.input}>
            <label htmlFor="name">Name</label>
            <input 
            type="text"
             id='name'
             value={user.name} 
             onChange={(e)=>setUser({...user,name:e.target.value})}
            />
            <input
            className='hidden'
            type="text"
             id='id'
             value={user.id} 
             readOnly
            //  onChange={(e)=>setUser({...user,name:e.target.value})}
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
            <button onClick={updateEmployee}>Submit</button>
        </div>
       
    </div>
    }
    </div>
  )
}

export default UpdateEmployee