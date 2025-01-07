import mongoose from "mongoose";
const connectDB = async()=>{
    try {
        // const uri = 'mongodb+srv://franjimenez:F123j%40@cluster0.yg1nm.mongodb.net/inventario_db?retryWrites=true&w=majority&appName=Cluster0';
        const uri = 'mongodb+srv://flakundo%40gmail.com:Cofla051984@cluster0.yg1nm.mongodb.net/';

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('conectado a la base de datos');
    }
    catch (e) {
        console.error(e);
        process.exit(1);
    }
}

export default connectDB;