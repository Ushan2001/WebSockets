const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let registerCount = 5000000;

app.use(express.json());
app.use(cors());

setInterval(() => {
  registerCount += 1;
  io.emit("registerCount", registerCount); 
}, 5000);

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.emit("registerCount", registerCount);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
