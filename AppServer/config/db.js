require('dotenv').config();

const devConfig = {
    MONGO_URL: process.env.MONGO_URL_DEV
};

const testConfig = {
    MONGO_URL: 'mongodb+srv://someuser:someuserroot@cluster0-9hrlu.mongodb.net/de_test'
};

const prodConfig = {
    MONGO_URL: 'mongodb+srv://someuser:someuserroot@cluster0-9hrlu.mongodb.net/de'
};

const defaultConfig = {
    PORT: process.env.PORT || 3000
};

function envConfig(env) {
    switch (env) {
        case 'development':
            return devConfig;
        case 'test':
            return testConfig;
        default:
            return prodConfig;
    }
}

exports.default = envConfig(process.env.NODE_ENV);