import mongoose from "mongoose";
const {Schema, model} = mongoose;

const UserSchema = new Schema({
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

}, {timestamps: true}
);

export default model("UserModel", UserSchema);

