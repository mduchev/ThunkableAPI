class EstimationService {
    async GetEstimation() {
        return Math.floor(Math.random() * (10000)) + 1;
    }
}

module.exports = EstimationService;