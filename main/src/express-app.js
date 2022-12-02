const express = require("express");
const { main } = require("./api");

module.exports = async (app, channel) => {
  app.use(express.json());

  main(app, channel);
};
