import WebSocket from "ws";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8080})

wss.on('connection', ws => {
    ws.send("hai connection opened")
})