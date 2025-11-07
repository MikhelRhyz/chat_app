const STORAGE_KEY = "chat_app_messages";
const saved = localStorage.getItem(STORAGE_KEY);
const chatBox = document.getElementById("chatBox");
const chatForm = document.getElementById("chatForm");
const msgInput = document.getElementById("msgInput");

let messages = [];

if (saved) {
  messages = JSON.parse(saved);
}

renderMessages();

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = msgInput.value.trim();
  if (text === "") return;

  const message = {
    text,
    timestamp: Date.now(),
    who: "me",
  };

  messages.push(message);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));

  renderMessages();

  setTimeout(() => {
    const reply = {
      text: "This is an automated reply.",
      timestamp: Date.now(),
      who: "other",
    };

    messages.push(reply);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    renderMessages();
  }, 1000);

  msgInput.value = "";
  msgInput.focus();
});

function renderMessages() {
  chatBox.innerHTML = "";
  messages.forEach((msg) => {
    const div = document.createElement("div");
    div.className = "message" + (msg.who === "me" ? " me" : " bot");
    div.textContent = msg.text;
    chatBox.appendChild(div);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}
