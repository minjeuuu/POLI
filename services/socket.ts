import { io } from "socket.io-client";

const socket = io(); // Connects to the same host/port as the window

export default socket;
