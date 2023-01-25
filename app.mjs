import express, { json } from "express";
let app = express()
import config from "./src/config/defaults.mjs";
import helmet from "helmet";
// const logger = require("pino")();
import create_http_error from "http-errors";
const { NotFound } = create_http_error;
import pino from 'pino';
const logger = pino();
import {connectDB} from "./src/infrastructure/database/mongoose.mjs";
import authRoute from "./src/interface/http/routes/authRoute.mjs";
import userRoute from "./src/interface/http/routes/userRoute.mjs"; 
import taskRoute from "./src/interface/http/routes/taskRoute.mjs";
import subRoute from "./src/interface/http/routes/subRoute.mjs";
import cors from 'cors';

// handling uncaught exception
process.on('uncaughtException', err=>{
    logger.info(`Error ${err.message}`)
    logger.info(`Shutting down due to uncaught exceptions...`)
    process.exit(1);
});

connectDB();
app.use(json())
app.use(cors());

// helps secure our express app by setting various HTTP head099Mers
app.use(helmet());

// BASE ROUTE
app.get("/", (req, res, next)=>{
    res.status(200).json({
     message : "API v1 is running",
     env: config.env,
     projectName: config.projectName
    })
});

//  Application routes
app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/user/", userRoute);
app.use("/api/v1/user/subscription", subRoute);
app.use("/api/v1/user/task", taskRoute);

// Not found route
app.use(async (req, res, next) => {
    next(NotFound());
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

const server = app.listen(config.port, () => {
    logger.info(`Server started on port ${config.port} in ${config.env} mode.`);
});


//  Handling unhandled promise rejection
process.on('unhandledRejection', err=>{
    logger.info(`Error: ${err.message}`);
    logger.info(`Shutting down the server due to Unhandled promise rejection...`);
        server.close(()=>{
            process.exit(1)
        });
});