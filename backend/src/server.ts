import express from "express";
import http from "http";
import { setupWebSocket } from "./utils/websocket";
import { sequelize } from "./db/connection";
import itemRoutes from "./routes/itemRoutes";
import folderRoutes from "./routes/folderRoutes";

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.use(express.json());
app.use("/api/items", itemRoutes);
app.use("/api/folders", folderRoutes);

const PORT = 4000;

const startServer = async () => {
  try {
    await sequelize.sync({ force: false });
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Error: ", err);
  }
};

startServer();
