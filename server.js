const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

let textContent = '';

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.emit("content", textContent);

  socket.on("add item", (item) => {
    textContent = item;
    io.emit("content", textContent);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
