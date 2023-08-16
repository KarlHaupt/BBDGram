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

//Donload MongoDB - https://www.mongodb.com/try/download/community
//Install it+ leave everything as default
//Edit environment variables
    // a) Double Click on the PATH environment variable
    // b) Add the directory of MongoDB, it should be this - (C:\Program Files\MongoDB\Server\7.0\bin) if you installed it with the default options
//In the C: Directory
    // a) Add folder called 'data'
    // b) Add folder inside the 'data' folder called 'db'
//AWESOME - go to MongoDB compass (which was installed when you installed MongoDB and specify your local DB string eg. mongodb://localhost:27017/BBDgram OR mongodb://0.0.0.0:27017/BBDgram)