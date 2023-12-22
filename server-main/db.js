const mongoose  = require("mongoose")
const dotenv =  require("dotenv");

// Dotenv configuration
dotenv.config();

const dbConnection = async () => {
    try {    //'mongodb://localhost:27017/seconddb'    option 2: process.env.MONGODB_URL
      mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log("DB connected successfully");
    } catch (error) {
      console.error(`DB ERROR: ${error}`);
    }
  }

module.exports = dbConnection