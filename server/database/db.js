import mongoose from "mongoose";

const mongoUri = process.env.MONGOURI;
const database = process.env.DBNAME;

const connectDB = async() =>{
    try {
        
        const connectionInstance = await mongoose.connect(`${mongoUri}/${database}`);
        console.log("MongoDB connected at: ", connectionInstance.connection._connectionString);
        
    } catch (error) {
        console.error("Error connection DB",error);
    }
}

export default connectDB;