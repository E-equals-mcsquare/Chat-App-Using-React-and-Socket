var express = require("express");
var cors = require("cors");
var app = express();
const STATIC_CHANNELS = [1, 2, 3, 4, 5];

const PORT = 8000;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
var http = require("http").createServer(app);

var io = require("socket.io")(http);
http.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

io.on("connection", (socket) => {
  /* socket object may be used to send specific messages to the new connected client */
  console.log("new client connected");
  socket.emit("connection", null);

  socket.on("channel-join", (id) => {
    console.log("Channel Join", id);
  });

  socket.on("send-message", (message) => {
    console.log("Message", message);
    io.emit("send-message", message);
  });
});

app.get("/getChannels", (req, res) => {
  res.json({
    channels: STATIC_CHANNELS,
  });
});
