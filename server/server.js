const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const mongoDB = require('./config/db');
dotenv.config();
// mongoDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});