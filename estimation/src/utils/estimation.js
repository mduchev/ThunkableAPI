const EstimationService = require("../services/estimation-service");
const { APP_SECRET } = require("../config");
const jwt = require("jsonwebtoken");
const { UserRepository } = require("../database");

module.exports = (io) => {
    const service = new EstimationService();
    const repository = new UserRepository();

    io.use((socket, next) => {
        if (socket.handshake.headers.authorization) {
            const { authorization } = socket.handshake.headers;
            const token = authorization.split(" ")[1];
            jwt.verify(token, APP_SECRET, async (err, decodedToken) => {
                if (err) {
                    console.log("Authentication error, Invalid Token supplied");
                    return;
                }

                const email = decodedToken.email;
                const theUser = await repository.FindUser({ email });
                if (!theUser) {
                    console.log("Invalid Email or Password!");
                    return;
                }
                socket.theUser = theUser;
                return next();
            });
        } else {
            console.log("Authentication error, Please provide a token");
        }
    });

    io.on('connection', (socket) => {
        console.log(`New client connected to socket with id ${socket.id}`);

        socket.on('getNumber', async (callback) => {
            const generatedNumber = await service.GetEstimation();
            console.log(`Sending back: ${generatedNumber}`);
            callback(generatedNumber);
        });
        socket.on('disconnect', () => {
            console.log('Client has disconnected!')
        });
    });
}
