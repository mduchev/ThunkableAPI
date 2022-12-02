const { NumberModel } = require("../models");

class NumberRepository {
  async CreateNumber(value) {
    const number = new NumberModel({
      value
    });

    const numberResult = await number.save();
    return numberResult;
  }
}

module.exports = NumberRepository;
