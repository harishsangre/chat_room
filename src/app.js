const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

module.exports = app;
