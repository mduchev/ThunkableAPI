const { NumberRepository } = require("../database");
const {
    DbError
} = require("../utils/errors/app-errors");

class LongerService {
    constructor() {
        this.repository = new NumberRepository();
    }

    async SubscribeEvents(payload) {
        payload = JSON.parse(payload);
        console.log(payload);
        await this.SaveLongerTask(payload);
    }

    async SaveLongerTask(estimatedNumber) {
        try {
            const newNumber = await this.repository.CreateNumber(estimatedNumber);
            console.log(`Number created: ${newNumber}`);
        } catch (err) {
            throw new DbError(err);
        }
    }
}

module.exports = LongerService;