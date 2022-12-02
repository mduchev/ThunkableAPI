const { UserRepository } = require("../database");
const {
    GeneratePassword,
    GenerateSalt,
    GenerateSignature,
    ValidatePassword
} = require("../utils");
const {
    NotFoundError,
    ValidationError,
} = require("../utils/errors/app-errors");

class MainService {
    constructor() {
        this.repository = new UserRepository();
    }

    async SignIn(userInputs) {
        const { email, password } = userInputs;

        const existingUser = await this.repository.FindUser({ email });

        if (!existingUser)
            throw new NotFoundError("Invalid Email or Password!");

        const validPassword = await ValidatePassword(
            password,
            existingUser.password,
            existingUser.salt
        );
        if (!validPassword) throw new ValidationError("Invalid Email or Password!");

        const token = await GenerateSignature({
            email: existingUser.email,
            _id: existingUser._id
        });
        return { id: existingUser._id, token };
    }

    async SignUp(userInputs) {
        const { email, password } = userInputs;

        const existingUser = await this.repository.FindUser({ email });
        if (existingUser)
            throw new NotFoundError("An user with this email address has already been registered!");

        let salt = await GenerateSalt();

        let userPassword = await GeneratePassword(password, salt);

        const newUser = await this.repository.CreateUser({
            email,
            password: userPassword,
            salt
        });

        const token = await GenerateSignature({
            email: email,
            _id: newUser._id
        });
        return { id: newUser._id, token };
    }
}

module.exports = MainService;