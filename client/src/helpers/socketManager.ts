import { io } from "socket.io-client";

export const socket = io(import.meta.env.PUBLIC_SOCKET_SERVER);
