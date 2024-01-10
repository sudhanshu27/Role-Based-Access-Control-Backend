const express = require("express");
const app = express();
const errorHandler = require("./utils/error-handler");
const { Connection } = require("./utils/db");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./users/user.controller"));

app.use(errorHandler);

const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.a5z2nyf.mongodb.net/dbforfinaltest?retryWrites=true&w=majority`;

Connection(URL);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
