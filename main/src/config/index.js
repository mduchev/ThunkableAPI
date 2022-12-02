const dotEnv = require("dotenv");
if (process.env.NODE_ENV !== 'prod') {
    const configFile = `../.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
} else {
    dotEnv.config();
}

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL || 'mongodb://127.0.0.1:27017/thunkabledb',
    APP_SECRET: process.env.APP_SECRET,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME || 'THUNKABLE',
    MSG_QUEUE_URL: process.env.MSG_QUEUE_URL || 'amqp://127.0.0.1:5672',
    MAIN_SERVICE: "main_service",
    SENTRY_DSN: process.env.SENTRY_DSN || 'https://af3c03ef60e84d85aaac8e096a54881b@o4504246990536704.ingest.sentry.io/4504247902470144',
    WS_URL: process.env.WS_URL
}