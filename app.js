const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  console.log(`${req.method} request for ${req.url}`);
});

const port = 5050;

app.listen(port, () => {
  console.log(`Server running on port ${port} 😎`);
});