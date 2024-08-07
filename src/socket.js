import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API_URL, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export default socket;