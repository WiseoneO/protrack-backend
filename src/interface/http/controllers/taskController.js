const teamModel = require("../../../infrastructure/database/models/teamTask");
const individualModel = require("../../../infrastructure/database/models/individualtask");
const departmentModel = require("../../../infrastructure/database/models/departmentTask");
const {createTaskSchema} = require("../validations/taskValidation");



// create team

// exports.createTeam = async (req, res)=>{
//     try{
//         const userId = req.params.id;
//         const currentUser = await userModel.findById({_id : req.user._id});
//         try{
//             if(!currentUser.team.includes(userId)){
//                 const userCheck = await userModel.findOne({_id : userId});
//                 if(!userCheck) throw new Error (`User not found`);
//                 if(userId === currentUser) throw new Error (`Not allowed `);
//                 await currentUser.updateOne({$push: {team: userId}});
//                 // await userCheck.updateOne({$push: {team: currentUser.id}});
//                 res.status(200).json({
//                     success: true,
//                     msg: `Added successfully!`,
//                     data: currentUser,
//                   });
//             }else{
//             throw new Error(`Already a team member`);
//             }
//         }catch(error){
//             throw error;
//         }
//     }catch(error){
//         if (error instanceof Error) {
//             res
//             .status(500)
//             .json({ success: false, msg: `${error}` });
//         }
//     }
// }

// Create Task

exports.CreateTask = async (req, res) => {
    try {
        const taskType = req.query.taskType;
        const {title,description,department,status,time_frame,start_date,} = req.body;
        const created_By  = req.user._id;
        // console.log(created_By)
        const {
            error
        } = createTaskSchema(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        if (taskType === 'individual') {
            const individualTask = await individualModel.create({
                title,
                description,
                department,
                status,
                time_frame,
                start_date,
                created_By
            });
            return res.status(201).json({
                success : true,
                msg: 'Individual task created successfully.',
                data: individualTask,
            });
        } else if (taskType === 'team') {
            const task = await teamModel.create({
                title,
                description,
                department,
                status,
                time_frame,
                start_date,
                created_By
            })
            // await task.save();

             res.status(201).json({
                success : true,
                msg: ` ${taskType} created successfully`,
                data: task,
            });
        }else if(taskType === 'department'){
            const task = await departmentModel.create({
                title,
                description,
                department,
                status,
                time_frame,
                start_date,
                created_By
            })
            // await task.save();

             res.status(201).json({
                success : true,
                msg: ` ${taskType} created successfully`,
                data: task,
            });
        }
    } catch (error) {
        if (error instanceof Error) {
            res
                .status(500)
                .json({
                    success: false,
                    msg: `${error}`
                });
        }
    }
}