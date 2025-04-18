const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from React frontend
    methods: ["GET", "POST"],
    credentials: true,
  },
});

module.exports = { app, server, io };