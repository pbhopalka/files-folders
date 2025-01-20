import { Server } from "socket.io";

export const setupWebSocket = (server: any) => {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("update", (data) => {
      io.emit("update", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};
