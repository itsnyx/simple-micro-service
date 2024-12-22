const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const PORT = 3000;

// Proxy routes for each microservice
app.use(cors());

app.use(
  "/api/v1/microservice1",
  createProxyMiddleware({
    target: "http://microservice1:3001",
    changeOrigin: true,
  })
);

app.use(
  "/api/v1/microservice2",
  createProxyMiddleware({
    target: "http://microservice2:3002",
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
});
