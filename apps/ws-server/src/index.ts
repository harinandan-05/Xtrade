import { WebSocketServer, WebSocket } from "ws";
// @ts-ignore
import * as finnhub from "finnhub";

const API_KEY = "d32gdkhr01qn0gi3s9kgd32gdkhr01qn0gi3s9l0"; 
const finnhubClient = new finnhub.DefaultApi(API_KEY);

const wss = new WebSocketServer({ port: 8080 });
console.log("WS server running on ws://localhost:8080");

wss.on("connection", (ws) => {
  let currentSymbol: string | null = null;
  let poller: NodeJS.Timeout | null = null;

  ws.on("message", (ev) => {
    const msg = JSON.parse(ev.toString());

    if (msg.type === "subscribe" && msg.symbol) {
      console.log("User subscribes to:", msg.symbol);
      currentSymbol = msg.symbol;

      // Clear old interval if already running
      if (poller) clearInterval(poller);

      // Start polling this symbol just for this client
      poller = setInterval(() => {
        finnhubClient.quote(currentSymbol!, (err: Error, data: any) => {
          if (!err && data) {
            ws.send(
              JSON.stringify({
                value: (Math.random() - 0.5) * (Math.random() < 0.05 ? 40 : 2), 
                time: new Date().toISOString(),
              })
            );
          }
        });
      }, 1000); 
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
    if (poller) clearInterval(poller);
  });
});
