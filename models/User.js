const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required : true
    },
    lastname : {
        type : String,
        default : ""
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone_no : {
        type : Number,
        // required : true,
        unique : true
    },
    country_code : {
        type : Number,
        default : ""
    },
    password : {
        type : String,
        required : true,
        select : false,
    },
    company : {
        type : String,
        default : ""
    },
    industry : {
        type : String,
        enum : {
            values : [
                'Business',
                'Information Technology',
                'Banking',
                'Education/Training',
                'Telecommunication',
                'Others'
                ]
            },
        default : ""
    },
    job_title : {
        type : String,
        default : ""
    },
    profile_picture : {
        type : String,
        default : ""
    },
    isAdmin : {
        type :Boolean,
        default : false,
    },
    accessToken : {
        type : String,
        default : ""
    }
}, {timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);

