const dotEnv = require("dotenv");
if (process.env.NODE_ENV !== 'prod') {
    const configFile = `../.env.${process.env.NODE_ENV}`;
    dotEnv.config({ path: configFile });
} else {
    dotEnv.config();
}

module.exports = {
    WS_PORT: process.env.WS_PORT || 8080,
    APP_SECRET: process.env.APP_SECRET,
    DB_URL: process.env.DB_URL || 'mongodb://127.0.0.1:27017/thunkabledb'
}