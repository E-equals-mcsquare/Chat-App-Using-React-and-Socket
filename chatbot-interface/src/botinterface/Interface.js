import React, { Component } from "react";
import "../css/Interface.css";
import socketClient from "socket.io-client";
import * as $ from "jquery";

const SERVER = "http://127.0.0.1:8000";

let socket = socketClient(SERVER);
socket.on("connection", () => {
  console.log("Connected to the backend");
});

let userId = window.location.hash.split("/");
userId = userId[userId.length - 1];

socket.emit("channel-join", userId, (ack) => {});

socket.on("channel", (channel) => {
  console.log(channel);
});

socket.on("send-message", (message) => {
  if (message.senderName !== userId) {
    if (!message.isTyping) {
        var chatItem = document.createElement("div");
        chatItem.textContent = message.userQuery;
        chatItem.className = "receiverText";
        document.getElementById("chatArea").appendChild(chatItem);
    } else {
        console.log(message.senderName + ' is typing...')
    }
  }
});

export default class Interface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      isTyping: false
    };
  }

  componentDidMount() {
    
  }

  onUserQuery = () => {
    let userQuery = document.getElementById("userQuery").value;
    socket.emit("send-message", {
      channelId: 1,
      userQuery,
      senderName: userId,
    });

    document.getElementById("userQuery").value = "";
   
    var chatItem = document.createElement("div");
    chatItem.textContent = userQuery;
    chatItem.className = "senderText";
    document.getElementById("chatArea").appendChild(chatItem);
  };

  
  render() {
    return (
      <div>
        <div id="chatArea" className="interfaceBackground"></div>
        <div className="inputArea">
          <input id="userQuery" className="userQuery" onChange={this.onUserTyping} />
          <button onClick={this.onUserQuery}>Send</button>  
        </div>
        
      </div>
    );
  }
}
