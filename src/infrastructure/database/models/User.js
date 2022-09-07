const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required : true
    },
    lastname : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type: String,
        required: true,
        trim: true,
        immutable: true,
    },
    phoneNumber: {
        phoneNo: {
          type: String,
          required: true,
          trim: true,
        },
        countryCode: String,
      },
    password : {
        type : String,
        required: true,
        trim: true,
    },
    company : {
        type : String,
        default : ""
    },
    industry : {
        type : String,
        enum :  [
                'Business',
                'Information Technology',
                'Banking',
                'Education/Training',
                'Others'
                ]
    },
    job_title : {
        type : String,
    },
    profile_Image : {
        type : String,
    },
    isAdmin : {
        type :Boolean,
        default : false,
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    subscription: {
        type: String,
        enum: ['free', 'paid'],
      },
}, {timestamps: true}
);

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;
