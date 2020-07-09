import express from "express";
import socket from "socket.io";
import http from "http";
import cors from "cors";

const products = [
  {
    id: 1,
    name: "PS5",
  },
  {
    id: 2,
    name: "PS4 PRO",
  },
  {
    id: 3,
    name: "XBOX ONE",
  },
  {
    id: 4,
    name: "XBOX ONE S",
  },
];

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = socket(server, {
  path: "/products",
});

const connectedUsers = {};

io.on("connection", (socket) => {
  connectedUsers[socket.id] = socket.id;
  console.log(connectedUsers);

  socket.on("getProducts", () => {
    socket.emit("receiveProducts", products);
  });

  socket.on("disconnect", (socket) => {
    delete connectedUsers[socket.id];
  });
});

const PORT = process.env.PORT || "3333";
server.listen(PORT, () => {
  console.log(`[server] listening on ${PORT}`);
});
