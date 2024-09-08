const socket = io();
socket.emit("joinRoom");
socket.on("joined",function(){
    document.querySelector(".nobody").classList.add("hidden")
})