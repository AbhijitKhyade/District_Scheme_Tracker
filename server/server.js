const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const cookieParser = require('cookie-parser');
const socketIo = require('socket.io');
const mongoDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 8080;

dotenv.config();
mongoDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/admin', require('./routes/generic.route'));

const server = http.createServer(app);

// const io = require('./socket/socket')(server);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
