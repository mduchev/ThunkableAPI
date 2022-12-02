const express = require("express");
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel } = require("./utils");
const errorHandler = require("./utils/errors");

const StartServer = async () => {
    const app = express();

    await databaseConnection();

    const channel = await CreateChannel();

    await expressApp(app, channel);

    errorHandler(app);
}

StartServer();