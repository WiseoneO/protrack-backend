const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
    memberId : {
        type : String
    },
    role : {
        type : String,
        enums : ["admin","member"],
        default : 'member'
    }
})
const departmentSchema = new mongoose.Schema({
    created_By: {
        type: String,
        ref: 'User',
    },
    members : [memberSchema],
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
        enum : ["Pending", "In-Progress", "Completed"],
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

const DepartmentTaskModel = mongoose.model("Department", departmentSchema);

module.exports = DepartmentTaskModel;