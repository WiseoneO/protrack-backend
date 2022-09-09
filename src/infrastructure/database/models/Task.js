const mongoose = require("mongoose");



const TaskSchema = new mongoose.Schema({
    title : {
        type: String
    },
    description : {
        type : String
    },
    department : {
        type : String,
        enum : []
    },
    team : {
        type :String,
        enum : [],
    },
    teammate : {
        type : String,
        enum : []
    },
    status : {
        type : String,
        enum : ["Pending", "in Progress", "Completed"]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
},
    {
        timestamps: true,
    },
)

const taskModel = mongoose.model(Task, TaskSchema);

module.exports = taskModel;