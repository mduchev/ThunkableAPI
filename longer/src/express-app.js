const express = require("express");
const LongerService = require("./services/longer-tasks-service");
const { SubscribeMessage } = require("./utils");

module.exports = async (app, channel) => {
  app.use(express.json());

  await SubscribeMessage(channel, new LongerService());
};
