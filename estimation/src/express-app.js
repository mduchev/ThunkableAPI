const express = require("express");
const { estimation } = require("./utils");

module.exports = async (app, io) => {
  app.use(express.json());

  estimation(io);
};
