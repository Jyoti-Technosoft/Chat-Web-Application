import { io } from "socket.io-client";

import * as constant from "./constant";

const socket = io(constant.BASE_URL);
socket.on("connect", () => {});
socket.on("disconnect", (err) => {});
socket.on("connect_error", (err) => {});

export default socket;
