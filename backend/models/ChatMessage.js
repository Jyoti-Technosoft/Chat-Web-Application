import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender :{
      type: mongoose.Types.ObjectId,
      ref: 'user',
    },
    users : [{
      type: mongoose.Types.ObjectId,
      ref: 'user',
    }],
    message : {
      type : String,
    },
    isReadById: {
      type: Boolean,
      default: false
    },

  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("message", messageSchema, "message");
export default messageModel;
