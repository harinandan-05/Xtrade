import { WebSocketServer, WebSocket } from "ws";
// @ts-ignore
import * as finnhub from "finnhub";

const API_KEY = "d32gdkhr01qn0gi3s9kgd32gdkhr01qn0gi3s9l0"; 
const finnhubClient = new finnhub.DefaultApi(API_KEY);

const wss = new WebSocketServer({ port: 8080 });
console.log(" WS server running on ws://localhost:8080");

function broadcast(data: any) {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}


const symbols = ["BINANCE:BTCUSDT", "BINANCE:ETHUSDT"];

// poll every 5 sec
setInterval(() => {
  symbols.forEach((symbol) => {
    finnhubClient.quote(symbol, (err: any, data: any) => {
      if (!err && data) {
        broadcast({
          type: "cryptoUpdate",
          symbol,
          price: data.c,
          time: new Date().toISOString(),
        });
      }
    });
  });
}, 1000 * 60);

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send(JSON.stringify({ type: "welcome", msg: "Connected to crypto WS" }));
});
