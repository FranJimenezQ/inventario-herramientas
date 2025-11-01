import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('conectado a la base de datos');
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}

export default connectDB;