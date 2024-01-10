const mongoose = require("mongoose");

const Connection = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to the database ", error);
  }
};

module.exports = {
  Connection: Connection,
};
