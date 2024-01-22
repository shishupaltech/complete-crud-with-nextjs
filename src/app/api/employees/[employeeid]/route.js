import {NextRequest,NextResponse} from 'next/server';
import Employee from '@/models/employeeModal';
import { connect } from '@/db/dbConnection';

connect();
export async function DELETE(NextRequest,content){
    try {

        const employeeId = content.params.employeeid;
        const record = {_id:employeeId};
        const result = await Employee.deleteOne(record);
        return NextResponse.json({message:"Employee Deleted Successfully",success:true},{status:200});
        
    } catch (error) {
        console.log("Error:",error);
        return NextResponse.json({error:error.message},{status:500});
    }
}

export async function GET(NextRequest,content){
    try {
        const employeeId = content.params.employeeid;
        const record = {_id:employeeId};
        const data =await Employee.findById(record);
        // console.log(record);
        return NextResponse.json({message:"Employee Fetched Successfully",success:true,data},{status:200});
    } catch (error) {
        console.log("Error: ",error);
        return NextResponse.json({error:error.message},{status:500});
    }
}

