import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        
        const uri = process.env.MONGODB_URI;

        await mongoose.connect(uri);
        console.log('conectado a la base de datos');
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}

export default connectDB;