const express = require("express");
const cors = require("cors");
const db = require("./app/models");
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

let corsOptions = {
  origin: `http://localhost:${PORT}`
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

db.sequelize.sync().then(() => {
  console.log('Drop and Resync Db');
});

require('./app/routes/auth.routes')(app);

require('./app/routes/user.routes')(app);

// simple route
app.get("/", (req, res) => {
   res.json({ message: "Welcome to bezkoder application." });
});

app.get('*', (req, res) => {
  res.send('404 Page Not Found');
});

app.post('*', (req, res) => {
  res.send('404 Page Not Found');
});

// set port, listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});