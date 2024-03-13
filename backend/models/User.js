import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },
    password: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("user", UserSchema, "user");
export default UserModel;
