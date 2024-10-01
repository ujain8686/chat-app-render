const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-client-navy.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.roomNumber);
  });

  socket.on("send_message", (data) => {
    console.log(data, "daada");
    
    socket.to(data.room).emit("receive_message", data);
    // socket.broadcast.emit("receive_message", data.message);
    // console.log(data,"msg");
    
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING...");
});