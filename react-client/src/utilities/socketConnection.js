import io from "socket.io-client"
let socket = io("http://localhost:8181")

socket.emit("clientAuth", "sfsfhs")

export default socket