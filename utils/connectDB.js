import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Db connect successfully",);

        
    } catch (error) {
        console.log("Db connect failed",error);
        process.exit(1);
    }
    
}


export default connectDB