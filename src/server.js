require("dotenv").config();
const http = require("http");
const { initSocket } = require("./config/socket.js");
const app = require("./app.js");
const connectDB = require("./config/db.js");
const server = http.createServer(app);

const io = initSocket(server);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log("Database connected, starting server...");
  })
  .catch((error) => {
    console.error(
      "Database connection failed, server not started:",
      error.message,
    );
  });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
