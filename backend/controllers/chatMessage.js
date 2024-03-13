import messageModel from "../models/ChatMessage.js";

import * as constants from "../const/constant.js";

export default {
  getAllMessgeBySenderAndReciver: async (req, res) => {
    try {
      let { sender, reciver } = req.query;
      if (!sender || !reciver) {
        return res
          .status(409)
          .json({ success: false, message: constants.MESSAGE_WRONG_USERS });
      }
      const message = await messageModel
        .find({
          users: {
            $all: [sender, reciver],
          },
        })
        .select("-__v -updatedAt ");
      return res.status(200).json({
        success: true,
        message: constants.MESSAGE_GET_SUCESS,
        data: message,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: constants.SERVER_ERROR,
        error: err.message,
      });
    }
  },
  sendMessage: async (value) => {
    try {
      let body = value;
      if (!body.sender || !body.reciver) {
        return res
          .status(409)
          .json({ success: false, message: constants.MESSAGE_WRONG_USERS });
      }

      const message = await messageModel.create({
        message: body.message,
        users: [body.reciver, body.sender],
        sender: body.sender,
      });
      const findMessage = await messageModel
        .findById(message.id)
        .select("-__v -updatedAt");
      return findMessage;
    } catch (error) {
      return error
    }
  },
};
