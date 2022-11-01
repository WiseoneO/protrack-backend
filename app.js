const express = require("express");
// const morgan = require("morgan");
const config = require("./src/config/defaults")
const helmet = require("helmet");
const logger = require("pino")();
const createError = require("http-errors");
const connectDB = require("./src/infrastructure/database/mongoose");
const authRoute = require("./src/interface/http/routes/authRoute");
const userRoute = require("./src/interface/http/routes/userRoute");
const taskRoute = require("./src/interface/http/routes/taskRoute");
const cors = require('cors')

const app = express();
connectDB();

// console.log(express)
app.use(express.json())

app.use(cors());
// log routes visited
// app.use(morgan("common"));

// helps secure our express app by setting various HTTP head099Mers
app.use(helmet());


// Firing the routes

app.get("/api/v1/", (req, res, next)=>{
    res.status(200).json({
     message : "API v1 is running",
     env: config.env,
     projectName: config.projectName
    })
 })
app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/user/", userRoute);
app.use("/api/v1/user/task", taskRoute);

// Not found route
app.use(async (req, res, next) => {
    next(createError.NotFound());
})

// catch application errors
app.use(async (error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(config.port, ()=>{
    logger.info(`Server started on port`)
})