import mongoose, { Schema } from "mongoose";

export interface IUser {
    username: string,
    email: string
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [255, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
    },

});

export default mongoose.model<IUser>("User", userSchema);