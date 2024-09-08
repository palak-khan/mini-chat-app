const express = require("express");
const app = express();
const path = require("path");
const indexRouter = require("./routes/index");

const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);

let waitingUsers = [];
let rooms = {};

io.on("connection", function (socket) {
  socket.on("joinRoom", function () {
    if (waitingUsers.length > 0) {
      // here we use shift() for removing first element from waitingUsers array and put it into partner
      let partner = waitingUsers.shift();
      const roomName = `${socket.id}-${partner.id}`;
      socket.join(roomName);
      partner.join(roomName);

      io.to(roomName).emit("joined");
    } else {
      waitingUsers.push(socket);
    }
  });

  socket.on("disconnect", function () {
   let index = waitingUsers.findIndex(waitingUser => waitingUser.id === socket.id);
   waitingUsers.splice(index,1)
  });
});

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

server.listen(3000, () => {
  console.log("Running on http://localhost:3000/");
});
