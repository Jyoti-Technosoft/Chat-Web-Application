// bcrypt js for encripting and decrypting password for security
import bcrypt from "bcrypt";
// json web token for genrating token
import jsonwebtoken from "jsonwebtoken";
// user Model
import UserModel from "../models/User.js";

import * as constants from "../const/constant.js";

export default {
  onGetAllUsers: async (req, res) => {
    try {
      const users = await UserModel.find().select('-__v -password');
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message : constants.SERVER_ERROR });

    }
  },
  onGetUserById: async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id).select('-password -__v');
      if (user) {
        return res.status(200).json({ success: true,message:constants.USER_REQUEST_SUCESS, user });
      } else {
        return res.status(404).json({ success: false,message:constants.USER_REQUEST_ERROR });
      }
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
  onCreateUser: async (req, res) => {
    try {
      const findUserWithEmail = await UserModel.findOne({
        email: req.body.email,
      });
      if (findUserWithEmail)
        return res
          .status(409)
          .json({ success: false, message: constants.EMAIL_ALREADY_EXIST });
      try {
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        let user = await UserModel.create(req.body);
        user = await UserModel.findById(user._id).select("-password -__v");
        return res.status(200).json({
          success: true,
          message: constants.USER_CREATED_SUCESS,
          data: user,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: constants.SERVER_ERROR,
          error: error.message,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: constants.SERVER_ERROR,
        error: error.message,
      });
    }
  },
    onLogin: async (req, res) => {
    try {
      let email = req.body.email;
      const findUserWithEmail = await UserModel.findOne({ email });
      if (findUserWithEmail ) {
        let comparePassword = await bcrypt?.compare(
          req.body.password,
          findUserWithEmail?.password
        );
        if(comparePassword) {
          let token = jsonwebtoken.sign(
            {
              id: findUserWithEmail.id,
              firstName: findUserWithEmail.firstName,
              lastName: findUserWithEmail.lastName,
              email: findUserWithEmail.email,
            },
            "291b0d040bbcd96c0135589dcf1387512f4269aa2e3660828d066d4b71a675213cd89b655fe2bc90c994266a6afeb7f491171c8d843b6a4ac38e55c80919f1e3",
            { expiresIn: "12h" }
          );
          return res.status(200).json({
            success: true,
            message: constants.USER_LOGGED_IN,
            token,
          });
        } else {
          return res.status(404).json({
            success: false,
            message: constants.BAD_CREDENTIAL,
          });
        }
      } else {
        return res.status(404).json({
          success: false,
          message: constants.BAD_CREDENTIAL,
        });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: constants.SERVER_ERROR, error:error.message });
    }
  },
  onDeleteUserById: async (req, res) => {
    try {
      const user = await UserModel.deleteByUserById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted a count of ${user.deletedCount} user.`,
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
};
