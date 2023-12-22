const app = require("express")();
const dotenv = require('dotenv');
const dbConnection = require("./db");
const cors = require('cors');
const bodyParser = require("body-parser");
const { ProductRouter } = require("./routers");


// Dotenv configuration
dotenv.config()

// applying cors
app.use(cors())

// middlewares
app.use(bodyParser.json())

// db connection
dbConnection()

// Router
app.use("/api",ProductRouter)

// server listening
app.listen(process.env.PORT,()=>console.log(`Server listening on ${process.env.PORT} port`))