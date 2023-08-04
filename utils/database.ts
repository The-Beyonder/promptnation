import mongoose from "mongoose";

let isConnected = false;

export const connectToDB= async()=>{
    mongoose.set('strictQuery',true);
    if(isConnected){
        console.log('mongoDB is connected');
        return;
    }

    if(!process.env.MONGODB_URI){
        throw new Error("Not URI")
    }
    
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
        })
        isConnected=true
        console.log("DB connected successfully")
    } catch (error) {
        console.log(error);
    }
}