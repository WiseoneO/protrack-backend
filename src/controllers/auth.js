const User = require("../models/User");
const jwt = require("jsonwebtoken");
const createError = require("http-errors")
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config()



