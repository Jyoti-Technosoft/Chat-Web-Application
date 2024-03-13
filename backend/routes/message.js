import express from 'express';
// controllers
import chatRoom from '../controllers/chatMessage.js';

const router = express.Router();

router
  .post('/', chatRoom.sendMessage)
  .get('/', chatRoom.getAllMessgeBySenderAndReciver)

export default router;
