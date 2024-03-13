import express from 'express';
// controllers
import user from '../controllers/user.js';
import  ValidateUser  from '../validators/User.js';

const router = express.Router();

router
  .get('/', user.onGetAllUsers)
  .post('/register',ValidateUser.createUser, user.onCreateUser)
  .post('/login',ValidateUser.validateLogin,user.onLogin)
  .get('/:id', user.onGetUserById)

export default router;
