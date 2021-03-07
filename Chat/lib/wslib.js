const WebSocket = require("ws");
const Message = require("../models/Message");
const MessageValidator = require("../validators/messageValidators");

const validator= new MessageValidator();
const clients = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      const input = JSON.parse(message);
      const {error} =validator.createValidator(input);
      if(error)
      {
        console.log(error.details[0]);
      }
      else
      {
        Message.create(input).then(()=>{
          sendMessages();
        });
      }
    });
  });

  const sendMessages = () => {    
    clients.forEach((client) => {
      Message.findAll().then((messages)=>{
        client.send(JSON.stringify(messages));
      });
    });
  };
};

exports.wsConnection = wsConnection;
exports.clients=clients;