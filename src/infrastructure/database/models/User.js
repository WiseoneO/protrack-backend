const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    full_name : {
        type:String,
        required : true
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
    team: {
        type  : Array,
        default : [], 
    },
    job_title : {
        type : String,
    },
    avatar : {
        type : String,
    },
    messages: [],
    isDeleted : {
        type : Boolean,
        default : false
    },
    isVerified: {
        type : Boolean,
        default : false,
    },
    subscription: {
        type: String,
        enum: ['free', 'paid'],
      },
    tasks:{
        individual : {
            type: String,
            ref: 'Individual',
        },
        team : {
            type: String,
            ref: 'TeamTask',
        },
        department : {
            type: String,
            ref: 'Department',
        }
        
    },

}, {timestamps: true}
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
