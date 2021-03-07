const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  let html=``;
  data=data.sort((a,b)=>{return a.ts-b.ts;});
  data.forEach(e => {
    if(e.author===author)
    {
      html=html+`<p class="user">${e.message}<-YOU</p>`
    }
    else
    {
      html=html+`<p class="notUser">${e.author}->${e.message}</p>`
    }
  });
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  const ts= Date.now();
  const toSend={
    message:message.value,
    ts:ts,
    author:author
  };
  ws.send(JSON.stringify(toSend));
  message.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
/**
 * Optener información de autor de mensajes
 */
const author = prompt("Enter your name for the chat: ","Nombre Ejemplo");
const h1 = document.querySelector("h1");
const welcome = document.createTextNode("Chat de "+author);
h1.appendChild(welcome);