//-------CHAT PART-------------------
const socket = io(`/`);
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
let messages = document.querySelector(".messages");

const user = prompt("What is your name?");
appendMessage("You joined");
socket.emit("new-user", user);

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);

});

socket.on("user-connected", (name) => {
  appendMessage(`${name} connected`);

});

socket.on("user-disconnected", (name) => {
  appendMessage(`${name} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  var d = new Date();

  console.log("message : ", message);
  messages.innerHTML =
    messages.innerHTML +
    `<div class="message-blue">
<b><i class="far fa-user-circle"></i> <span> ${user}</span> </b>
<span class="message-content">${message}</span>
<div class="message-timestamp-left">${
      d.getHours() < 10 ? "0" + d.getHours() : d.getHours()
    }:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}</div>
</div>`;
}

//-----------------------------------
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
const showChat = document.querySelector("#showChat");
const backBtn = document.querySelector(".header__back");
myVideo.muted = true;

backBtn.addEventListener("click", () => {
  document.querySelector(".main__left").style.display = "flex";
  document.querySelector(".main__left").style.flex = "1";
  document.querySelector(".main__right").style.display = "none";
  document.querySelector(".header__back").style.display = "none";
});

showChat.addEventListener("click", () => {
  document.querySelector(".main__right").style.display = "flex";
  document.querySelector(".main__right").style.flex = "1";
  document.querySelector(".main__left").style.display = "none";
  document.querySelector(".header__back").style.display = "block";
});

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "443",
});

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    audio: true,
    video: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id, user);
});

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};

const muteButton = document.querySelector("#muteButton");
const stopVideo = document.querySelector("#stopVideo");

muteButton.addEventListener("click", () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;

  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    const html = `<i class="fas fa-microphone-slash"></i>`;
    muteButton.innerHTML = html;
    muteButton.classList.add("red_btn");
  } else {
    myVideoStream.getAudioTracks()[0].enabled = true;
    const html = `<i class="fas fa-microphone"></i>`;
    muteButton.classList.remove("red_btn");
    muteButton.innerHTML = html;
  }
});

stopVideo.addEventListener("click", () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    const html = `<i class="fas fa-video-slash"></i>`;
    stopVideo.classList.toggle("red_btn");
    stopVideo.innerHTML = html;
  } else {
    myVideoStream.getVideoTracks()[0].enabled = true;
    const html = `<i class="fas fa-video"></i>`;
    stopVideo.classList.toggle("red_btn");
    stopVideo.innerHTML = html;
  }
});
