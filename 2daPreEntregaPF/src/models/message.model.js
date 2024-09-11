import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  message: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const messageModel = model("Message", messageSchema);

export default messageModel;
