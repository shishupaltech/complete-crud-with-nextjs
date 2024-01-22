import { connect } from "@/db/dbConnection";
import Employee from "@/models/employeeModal";
import {NextRequest,NextResponse} from 'next/server';

connect();
// to store employee 
export async function POST(NextRequest) {
 try {
    const data =await NextRequest.formData()
  const name = data.get('name');
  const email = data.get('email');
  const contact = data.get('contact');
  const profileImg=data.get('profileImg');
  const employee = await Employee.findOne({email});
  if(employee){
    return NextResponse.json({error:"Employee already exists"},{status:400});
  }
  const newEmployee = new Employee({
    name,
    email,
    contact,
    profileImg
  });
  const savedEmployee = await newEmployee.save();
  return NextResponse.json({message:"Employee created successfully",success:true,savedEmployee});
 } catch (error) {
    return NextResponse.json({error:error.message},{status:500});
 }
  
}


export async function GET(NextRequest){
    try {
        const employees = await Employee.find();
        return NextResponse.json({
            message:"Employee Fetched Successfully",
            success:true,
            employees,
        },{status:200});
    } catch (error) {
        console.log('Error:',error);
        return NextResponse.json({error:error.message},{status:500});
    }
}

export async function PUT(NextRequest){
  try {
    const formData=await NextRequest.formData();
    const _id= formData.get('id');
    const name = formData.get('name')
    const email = formData.get('email')
    const contact = formData.get('contact')
    const profileImg = formData.get('profileImg')
    const response = await Employee.findByIdAndUpdate(_id,{
      name:name,
      email:email,
      contact:contact,
      profileImg:profileImg,
    },{new:true});
    // console.log(formData);
    return NextResponse.json({
      message:"Employee update Successfully",
      success:true,
      response,
  },{status:200});
  } catch (error) {
    console.log('Error:',error);
    return NextResponse.json({error:error.message},{status:500});
  }
}




