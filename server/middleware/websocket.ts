import { WebSocketServer } from "ws";
import { IncomingMessage, Server } from "http";

export default defineEventHandler(async (event) => {
  const { headers } = event;
  if (headers.get("upgrade") === "websocket") {
    const wss = new WebSocketServer({ noServer: true });

    //wtf... oh well
    ((event.node.res.socket as any)?._server as Server).on(
      "upgrade",
      (request, socket, head) => {
        wss.handleUpgrade(request, socket, head, (ws) => {
          wss.emit("connection", ws, request);
        });
      }
    );

    wss.on("connection", (ws) => {
      console.log("WebSocket connection opened");

      ws.on("message", (message) => {
        console.log("Received message:", message);
        ws.send(message);
        // Echo the message back to the client
      });

      ws.on("close", () => {
        console.log("WebSocket connection closed");
      });

      ws.on("error", (error) => {
        console.error("WebSocket error:", error);
      });
    });
  }
});
