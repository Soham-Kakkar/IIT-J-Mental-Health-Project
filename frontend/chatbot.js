const styles = `
.chatbot-mano-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  z-index:2;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.chatbot-mano-box {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 300px;
  max-height: 80vh;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: none;
  flex-direction: column;
  background-color: #ffffff;
  border: 1px solid #ddd;
  z-index: 2;
}
.chatbot-mano-header {
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
}
.chatbot-mano-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chatbot-mano-message {
  padding: 8px;
  border-radius: 4px;
  max-width: 80%;
}
.chatbot-mano-message.user {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
}
.chatbot-mano-message.assistant {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: #333;
}
.chatbot-mano-input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}
.chatbot-mano-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}
.chatbot-mano-send-button {
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const chatButton = document.createElement("button");
chatButton.classList.add("chatbot-mano-button");
chatButton.textContent = "💬";
chatButton.onclick = toggleChatbox;

const chatbox = document.createElement("div");
chatbox.classList.add("chatbot-mano-box");
chatbox.id = "chatbot-mano-box";

const chatboxHeader = document.createElement("div");
chatboxHeader.classList.add("chatbot-mano-header");
chatboxHeader.textContent = "Chat with Assistant";

const chatboxMessages = document.createElement("div");
chatboxMessages.classList.add("chatbot-mano-messages");
chatboxMessages.id = "chatbot-mano-messages";

const chatboxInputContainer = document.createElement("div");
chatboxInputContainer.classList.add("chatbot-mano-input-container");

const chatboxInput = document.createElement("input");
chatboxInput.type = "text";
chatboxInput.classList.add("chatbot-mano-input");
chatboxInput.id = "chatbot-mano-input";
chatboxInput.placeholder = "Type a message...";

const sendButton = document.createElement("button");
sendButton.classList.add("chatbot-mano-send-button");
sendButton.textContent = "Send";
sendButton.onclick = sendMessage;

chatboxInputContainer.appendChild(chatboxInput);
chatboxInputContainer.appendChild(sendButton);

chatbox.appendChild(chatboxHeader);
chatbox.appendChild(chatboxMessages);
chatbox.appendChild(chatboxInputContainer);

document.body.appendChild(chatButton);
document.body.appendChild(chatbox);

function toggleChatbox() {
chatbox.style.display = chatbox.style.display === "flex" ? "none" : "flex";
chatboxInput.focus();
}

const messages = [
{
  role: "system",

  content: "You're a counsellor, therapist for depressed people on IIT Jammu's mental health and wellbeing website Manomitra.. you should provide friendly responses and make sure that response is not too long and no sadness, no sorrys, no negative word. always be enthusiastic, if user says something negative you're job is to lift him up. You are an AI friend, not real human. Help people when they are sad or depressed or suicidal",
},
{
  role: "assistant",
  content: "Hey, how are you?"
}

];

function renderMessages() {
chatboxMessages.innerHTML = "";
messages.filter(msg => msg.role !== "system").forEach(message => {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chatbot-mano-message", message.role);
  messageElement.textContent = message.content;
  chatboxMessages.appendChild(messageElement);
});
chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

async function chatWithGroq(content) {
const url = "url";
const apiKey = "apiKey";  // Replace with your actual API key

messages.push({ role: "user", content });
const payload = {
  messages: messages,
  model: "llama3-8b-8192",
  temperature: 1,
  max_tokens: 1024,
  top_p: 1,
  stream: false,
  stop: null
};

try {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);
  const data = await response.json();
  messages.push({ role: "assistant", content: data.choices[0].message.content });
  renderMessages();
} catch (error) {
  console.error("Chat API Error:", error);
}
}

function sendMessage() {
const content = chatboxInput.value;
if (content) {
  chatWithGroq(content);
  renderMessages();
  chatboxInput.value = "";
}
}

chatboxInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();  // Prevents the default action (form submission or other behavior)
    sendMessage();
  }
});

renderMessages();