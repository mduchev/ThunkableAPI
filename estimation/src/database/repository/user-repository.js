const { UserModel } = require("../models");

class UserRepository {
  async CreateUser({ email, password, salt }) {
    const user = new UserModel({
      email,
      password,
      salt
    });

    const userResult = await user.save();
    return userResult;
  }

  async FindUser({ email }) {
    const existingUser = await UserModel.findOne({ email: email });
    return existingUser;
  }
}

module.exports = UserRepository;
