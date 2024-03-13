import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";

// mongo connection
import "./config/mongo.js";
// routes
import userRouter from "./routes/user.js";
import chatMessageRouter from "./routes/message.js";
// middlewares
import { decode } from "./middlewares/jwt.js";
import * as scocket from './socket-io/index.js';

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users",decode, userRouter);
app.use("/message", decode, chatMessageRouter);

/** catch 404 and forward to error handler */
app.use("*", (req, res) => {
  return res.status(404).json({
    success: false,
    message: "API endpoint doesnt exist",
  });
});

const server = http.createServer(app);

//start connection for socket io connection
scocket.startSocketServer(server);

server.listen(port, err=> {
  if(err) console.log(err)
})