const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const socketConfig = require('./socket/socket');

dotenv.config();
const mongoDB = require('./config/db');
mongoDB();

const app = express();
const PORT = process.env.PORT || 8080;
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/admin', require('./routes/admin.route'));

// Socket.io configuration
const io = socketConfig(server);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});