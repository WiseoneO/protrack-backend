const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const createError = require("http-errors");

const connectDB = require("./config/database")
const authRoute = require("./routes/authRoute")
const dotenv = require("dotenv");
dotenv.config();

connectDB();
const app = express();
// console.log(express)
app.use(express.json())
// log routes visited
app.use(morgan("common"));
// helps secure our express app by setting various HTTP head099Mers
app.use(helmet());


// Fireing the routes
app.use("/api/protract.com/auth/", authRoute);











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

app.listen(process.env.PORT || 6000, ()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})