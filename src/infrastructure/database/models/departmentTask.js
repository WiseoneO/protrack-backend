const mongoose = require("mongoose");

// const memberSchema = new mongoose.Schema({
//     type : Array,
//     default : [],
//     role : {
//         type : String,
//         enum : ['admin', 'member'],
//         default : 'member'
//     }
// });
const departmentSchema = new mongoose.Schema({
    created_By: {
        type: String,
        ref: 'User',
    },
    // members : [memberSchema],
    members : {
        type: Array,
        default: [],
    },
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