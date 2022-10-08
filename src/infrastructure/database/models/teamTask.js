const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    created_By: {
        type: String,
        ref: 'User',
        // required: true,
        role: "Admin" 
    },
    members : [
            {
            type : String,
            },
    ],
    title : {
        type: String
    },
    description : {
        type : String
    },
    department : {
        type : String,
        enum : ["Business", "Education", "IT", "Marketing", "others"],
        default : "others"
    },
    status : {
        type : String,
        enum : ["Pending", "in Progress", "Completed"],
        default : "Pending"
    },
    time_frame : {
        type : String,
    },
    start_date : {
        type : String,
        default : Date.now
    }
},
    
    {
        timestamps: true,
    },
)

const TeamTaskModel = mongoose.model("TeamTask", teamSchema);

module.exports = TeamTaskModel;