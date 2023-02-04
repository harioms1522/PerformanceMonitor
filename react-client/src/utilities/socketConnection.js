import io from "socket.io-client"
let socket = io("http://localhost:8282")

socket.emit("clientAuth", "sfsfhs")

export default socket