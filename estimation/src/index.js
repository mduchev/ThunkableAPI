const express = require("express");
const expressApp = require('./express-app');
const { databaseConnection } = require('./database');
const { WS_PORT } = require("./config");
const { Server } = require("socket.io");

const StartServer = async () => {
  const app = express();

  await databaseConnection();

  const io = new Server(WS_PORT);
  await expressApp(app, io);
}

StartServer();