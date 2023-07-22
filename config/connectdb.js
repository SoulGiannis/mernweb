import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) =>{
    try {
        const DB_OPTIONS= {
            dbName: process.env.db_name,
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("connected successfully");
    } catch(err) {
        console.log(err);
    }
};  

export default connectDB;   