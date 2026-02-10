// index.js
const express = require("express");
const cors = require("cors");
const { rateLimiter } = require("./rateLimiter");

const app = express();
app.use(cors());
app.use(express.json());

// Example endpoint 1
app.get('/api/request', rateLimiter, (req, res) => {
  res.json({
    message: "Request successful !!",
    tokens_remaining: req.tokensLeft
  });
});

// Example endpoint 2
app.get('/api/info', rateLimiter, (req, res) => {
  res.json({
    message: "Info request successful",
    tokens_remaining: req.tokensLeft
  });
});

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
