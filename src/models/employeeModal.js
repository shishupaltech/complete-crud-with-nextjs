import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please Enter a Employee Name"]
        },
        email:{
            type:String,
            required:[true,"Please Enter a Employee Email"],
            unique:true,
        },
        contact:{
            type:String,
            required:[true,"Please Enter a Employee Contact Number"]
        },
        profileImg:{
            type:String,
            required:[true,"Please Enter a Employee Profile"]
        }

    }
);
const Employee = mongoose.models.employees || mongoose.model("employees",employeeSchema);
export default Employee;