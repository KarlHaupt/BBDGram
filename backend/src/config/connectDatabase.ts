import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const connectDatabase = () => {
    console.log('URI: ' + process.env.DB_LOCAL_URI)
    mongoose.connect(process.env.DB_LOCAL_URI ?? '').then((con: any) => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    }).catch((err: any) => {
        console.log(`Error connect to the DB: ${err}`)
    })
}