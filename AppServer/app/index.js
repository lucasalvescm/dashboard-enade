// require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('../config/db').default;
const course = require('./routes/course');
const institution = require('./routes/institution');
var cors = require('cors');
const app = express();

const mongoose = require('mongoose');
// const mongoDB = process.env.MONGODB_URI || dev_db_url;

mongoose.connect(dbConfig.MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/coursers', course);
app.use('/institutions', institution);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server is up and running on port number ' + PORT);
});

module.exports = app;