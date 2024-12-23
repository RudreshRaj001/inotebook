// Connecting to database 
const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/inotebook"; // connection


// Mongoose manages the database for us

// older Version (this won't work)
// const connectToMongo = () => {
//     mongoose.connect(mongoURI, () => {
//       console.log("Connected to MongoDB successfully");
//     }); // this function is wrong as it doesn't take a callback as argument
// };

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // add any other options you might need
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};



module.exports = connectToMongo;
