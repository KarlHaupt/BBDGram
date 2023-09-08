import mongoose, { Schema } from "mongoose";

export interface IUser {
    username: string;
    email: string;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [255, "Your name cannot exceed 255 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        minLength: [6, "Your email must be at least 6 characters"],
        maxLength: [320, "Your email cannot be longer than 320 characters"],
        unique: true
    },
});

export default mongoose.model<IUser>("User", userSchema );
