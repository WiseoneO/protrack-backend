import mongoose from "mongoose";
const {Schema, model} = mongoose;

const individualSchema = new Schema({
    created_By: {
        type: String,
        ref: 'User',
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
        // required: true
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

export default model("IndividualTaskModel", individualSchema);

