const MainService = require("../services/main-service");
const UserAuth = require("./middlewares/auth");
const { PublishMessage } = require("../utils");
const { MAIN_SERVICE, WS_URL } = require("../config");
const { io } = require("socket.io-client");

module.exports = (app, channel) => {
  const service = new MainService();
  let estimatedNumber = null;
  let ws = null;

  app.post("/signup", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await service.SignUp({ email, password });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.post("/signin", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await service.SignIn({ email, password });
      return res.json(data);
    } catch (error) {
      next(error);
    }
  });

  app.get("/main", UserAuth, async (req, res, next) => {
    try {
      if (!ws) {
        ws = io(WS_URL, {
          extraHeaders: {
            Authorization: req.headers.authorization
          }
        });
      }
      estimatedNumber = await new Promise(resolve => ws.emit('getNumber', data => {
        console.log(`received back: ${data}`);
        resolve(data);
      }));

      const isLongTask = estimatedNumber > 500;
      const response = isLongTask ? -1 : estimatedNumber;

      if (isLongTask) {
        PublishMessage(channel, MAIN_SERVICE, estimatedNumber);
      }
      return res.json(response);
    } catch (error) {
      next(error);
    }
  });
};
