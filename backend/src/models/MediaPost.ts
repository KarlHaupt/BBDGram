import mongoose, { Schema, Document } from "mongoose";

export interface IMedia {
  description: string;
  image: {
    data: Buffer,
    contentType: string
  };
  tag: string;
  user: Schema.Types.ObjectId;
}

const mediaSchema: Schema = new Schema({
  description: {
    type: String,
    required: [true, "Please enter description for this Post"],
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  tag: {
    type: String,
    required: [true, "Please select tag(s) for this Post"],
    enum: {
      values: [
        //Valid Tags
        "BBD",
        "Software Engineer",
        "Grad",
      ],
      message: "Please select correct tag(s) for this image",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model<IMedia>("MediaPost", mediaSchema);
