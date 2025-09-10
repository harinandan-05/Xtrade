import WebSocket, { WebSocketServer } from "ws";
    
const wss = new WebSocketServer({port:8080})
wss.on('connection',ws =>{
    console.log("ws server connected")

    ws.on('message',message =>{
        console.log(message)
    })

    ws.on('close',close =>{
        console.log("connection closed")
    })

    ws.send("welcome to xTrade")
})

console.log("ws server running on port 8080");
