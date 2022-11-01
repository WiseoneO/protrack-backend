const teamModel = require("../../../infrastructure/database/models/teamTask");
const individualModel = require("../../../infrastructure/database/models/individualtask");
const departmentModel = require("../../../infrastructure/database/models/departmentTask");
const userModel = require("../../../infrastructure/database/models/user");
const {createTaskSchema,edit} = require("../validations/taskValidation");
const HTTP_STATUS = require('http-status-codes');
const { findOne, findById } = require("../../../infrastructure/database/models/teamTask");
const { verify } = require("jsonwebtoken");
const {
    superAdminPermissions,
    adminPermissions,
    taskAdminPermissions,
    moderatorPermissions
}= require("../utils/permissions")
// Create Task
exports.CreateIndividualTask = async (req, res) => {
    try {
        const {title,description,department,status,time_frame,start_date} = req.body;
        const created_By = req.user._id;

        // Joi Task Schema Validation 
        const {error} = createTaskSchema(req.body);
        if (error) {
            return res.status(HTTP_STATUS.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.details[0].message
            });
        }
            const individualTask = await individualModel.create({
                title,
                description,
                department,
                status,
                time_frame,
                start_date,
                created_By
            });
             res.status(201).json({
                success : true,
                msg: `Task created successfully.`,
                data: individualTask,
            });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                    success: false,
                    msg: `${error}`
                });
        }
    }
}

// Create team task
exports.createTeamTask = async (req, res)=>{
    const {title,description,department,status,time_frame,start_date} = req.body;

    try{
        // Joi Task Schema Validation 
        const {error} = createTaskSchema(req.body);
        if (error) {
            return res.status(HTTP_STATUS.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.details[0].message
            });
        }
        const task = await teamModel.create({
            title,
            description,
            department,
            status,
            time_frame,
            start_date,
            created_By : req.user._id
        });
        await task.members.push({memberId : req.user._id, role: 'admin'});
        await task.save()
            res.status(201).json({
            success : true,
            msg: ` Team task created successfully`,
            data: task,
        });
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                success: false,
                msg: `${error}`
            });
        }
    } 
}

// Create department Task
exports.departmentTask = async(req, res)=>{
    const {title,description,department,status,time_frame,start_date} = req.body;

    try{
        const task = await departmentModel.create({
            title,
            description,
            department,
            status,
            time_frame,
            start_date,
            created_By : req.user._id
        });

        await task.members.push({memberId : req.user._id, role : "admin"});
        await task.save()
            res.status(201).json({
            success : true,
            msg: ` Department task created successfully`,
            data: task,
        });
        
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                success: false,
                msg: `${error}`
            });
        }
    }
}

// Update individual Task status
exports.updateIndividualTask = async(req, res) =>{
    try{
        const creatorId = req.user._id;
        const individualTaskId = req.params.id;
        let payload = req.body;
        const { error} = edit(payload);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        const editTask = await individualModel.findById({_id : individualTaskId});
        if(!editTask) throw new Error (`Task not found!`);

        const taskAdmin =  await individualModel.findOneAndUpdate({created_By : creatorId},payload, {new : true});
        if (!taskAdmin) throw new Error('Admin with this ID does not exist');

        await taskAdmin.save();
        res.status(201).json({
            success : true,
            msg: ` Individual tasks edited successfully`,
            data: taskAdmin,
        });


    }catch(error){
        if(error instanceof Error){
            res
                .status(500)
                .json({
                    success: false,
                    msg: `${error}`
                });
            }
    }
}

// Update team Task status
exports.updateTeamTask = async(req, res) =>{
    try{
        const teamTaskId = req.params.id;
        const payload = req.body;
        // Joi Task Schema Validation 
        const {error} = createTaskSchema(payload);
        if (error) {
            return res.status(HTTP_STATUS.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.details[0].message
            });
        }
        try{
            // verify task
            const verifyTask = await teamModel.findById(teamTaskId);
            if(!verifyTask) throw Error ('Task not found!');

            // checking for the role of the current user
            const currentUser = verifyTask.members.find((member) => member.memberId === req.user._id);
            if(!currentUser) throw Error ('You are not a member or an admin');

            // authorize admins this operation
            if(currentUser.role !== 'admin') throw Error ('you are not authorized');

            const updatedTask = await teamModel.findOneAndUpdate({_id : teamTaskId},payload,{new: true});

            res.status(HTTP_STATUS.StatusCodes.ACCEPTED).json({
                success : true,
                msg : 'Task updated successfully',
                data : updatedTask
            });
            
        }catch(error){
            throw error;
        }
    }catch(error){
        if(error instanceof Error){
            res
                .status(500)
                .json({
                    success: false,
                    msg: `${error}`
                });
            }
    }
}
// Update department Task status
exports.updatedepartmentTask = async(req, res) =>{
    try{
        const teamTaskId = req.params.id;
        const payload = req.body;

        // Joi Task Schema Validation 
        const {error} = createTaskSchema(payload);
        if (error) {
            return res.status(HTTP_STATUS.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.details[0].message
            });
        }
        try{
            // verify task
            const verifyTask = await departmentModel.findById(teamTaskId);
            if(!verifyTask) throw Error ('Task not found!');

            // checking for the role of the current user
            const currentUser = verifyTask.members.find((member) => member.memberId === req.user._id);
            if(!currentUser) throw Error ('You are not a member or an admin');


            // authorize admins this operation
            if(currentUser.role !== 'admin') throw Error ('you are not authorized');

            const updatedTask = await departmentModel.findOneAndUpdate({_id : teamTaskId},payload,{new: true});

            res.status(HTTP_STATUS.StatusCodes.ACCEPTED).json({
                success : true,
                msg : 'Task updated successfully',
                data : updatedTask
            })
            
        }catch(error){
            throw error;
        }
        
        

       

    }catch(error){
        if(error instanceof Error){
            res
                .status(500)
                .json({
                    success: false,
                    msg: `${error}`
                });
            }
    }
}

// Add TeamMembers
exports.addTeamMember = async (req, res, next)=>{
    try{
        const userId = req.params.id;
        const taskId = req.params.taskId;
        try{
            // verifying params values
            const verifyUser = await userModel.findById(userId);
            if(!verifyUser) throw Error ('User not found!');
            const verifyTask = await teamModel.findById(taskId);
            if(!verifyTask) throw Error ('Task not found');

            const ObjectToFind = userId;
            const isObjectPresent= verifyTask.members.find((member) => member.memberId === ObjectToFind);
            const currentUser = verifyTask.members.find((member) => member.memberId === req.user._id);
            if(!currentUser) throw Error ('You are not a member or an admin');

            // Authorizing admins to perform this operation
            if(currentUser.role !=='admin') 
                return res.status(HTTP_STATUS.StatusCodes.UNAUTHORIZED).json({
                    success : false,
                    msg : 'You are not authorized!'
                });
            if(!isObjectPresent && verifyTask.members.length < 7){
                await verifyTask.updateOne({$push : {members : {memberId: userId, role : 'member'}}});
                    res.status(HTTP_STATUS.StatusCodes.OK).json({
                        success : true,
                        msg: 'New user added',
                        data : verifyTask.members
                    });
            }else if(verifyTask.members.length >= 7){
                    throw Error ('Team limit reached');
                }else{
                    res.status(HTTP_STATUS.StatusCodes.OK).json({
                        success : true,
                        msg : `${verifyUser.email} is already a member`
                    });
                }
        }catch(error){
            throw error;
        }
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                    success: false,
                    msg: `${error}`
                });
            }
    }
}
// Add department Members
exports.addDepartmentMember = async (req, res)=>{
    try{
        const userId = req.params.id;
        const taskId = req.params.taskId;
        try{
            // verifying params values
            const verifyUser = await userModel.findById(userId);
            if(!verifyUser) throw Error ('User not found!');
            const verifyTask = await departmentModel.findById(taskId);
            if(!verifyTask) throw Error ('Task not found');

            const ObjectToFind = userId;
            const isObjectPresent= verifyTask.members.find((member) => member.memberId === ObjectToFind);
            const currentUser = verifyTask.members.find((member) => member.memberId === req.user._id);
            if(!currentUser) throw Error ('You are nnot a member of this group or an admin')
            // Authorizing admins to perform this operation
            if(currentUser.role !=='admin') 
                return res.status(HTTP_STATUS.StatusCodes.UNAUTHORIZED).json({
                    success : false,
                    msg : 'You are not authorized!'
                });
            if(!isObjectPresent && verifyTask.members.length < 15){
                await verifyTask.updateOne({$push : {members : {memberId: userId, role : 'member'}}});
                    res.status(HTTP_STATUS.StatusCodes.OK).json({
                        success : true,
                        msg: 'New user added',
                        data : verifyTask.members
                    });
            }else if(verifyTask.members.length >= 15){
                    throw Error ('Team limit reached');
                }else{
                    res.status(HTTP_STATUS.StatusCodes.OK).json({
                        success : true,
                        msg : `${verifyUser.email} is already a member`
                    });
                }
        }catch(error){
            throw error;
        }
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                    success: false,
                    msg: `${error}`
                });
            }
    }
}

// Remove a Team Member
exports.removeTeamMember = async (req, res) =>{
    try{
        const memberId = req.params.id;
        const taskId = req.params.taskId;

        try{
            // verify member & task IDs
            const verifyMember = await userModel.findById(memberId);
            if(!verifyMember) throw Error('User not found!');
            const verifyTask = await teamModel.findById(taskId);
            if(!verifyTask) throw Error ('Task not found!');

            // Checking current user role.
            const isObjectPresent = verifyTask.members.find((member) => member.memberId === memberId);
            if(!isObjectPresent) throw Error (`${verifyMember.email}, is not a member`);
            const currentUser = verifyTask.members.find((member) => member.memberId === req.user._id);
            if(!currentUser) throw Error ('You are not a member or an admin');

            if(currentUser.role !== 'admin') throw Error('You are not authorize!')

            await verifyTask.updateOne({$pull : {members : {memberId : memberId }}});

            res.status(HTTP_STATUS.StatusCodes.OK).json({
                success : true,
                totalNo : verifyTask.members.length,
                msg : 'User removed successfully',
                data : verifyTask
            })

        }catch(error){
            throw error;
        }

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                success: false,
                msg: `${error}`
            });
        }
    }
}

// Remove a Department Member
exports.removeDepartmentMember = async (req, res) =>{
    try{
        const memberId = req.params.id;
        const taskId = req.params.taskId;

        try{
            // verify member & task IDs
            const verifyMember = await userModel.findById(memberId);
            if(!verifyMember) throw Error('User not found!');
            const verifyTask = await departmentModel.findById(taskId);
            if(!verifyTask) throw Error ('Task not found!');

            // Checking current user role.
            const isObjectPresent = verifyTask.members.find((member) => member.memberId === memberId);
            if(!isObjectPresent) throw Error (`User is not a member`);
            const currentUser = verifyTask.members.find((member) => member.memberId === req.user._id);
            if(!currentUser) throw Error ('You are not a member or an admin');

            if(currentUser.role !== 'admin') throw Error('You are not authorize!');

            await verifyTask.updateOne({$pull : {members : {memberId : memberId }}});

            res.status(HTTP_STATUS.StatusCodes.OK).json({
                success : true,
                totalNo : verifyTask.members.length,
                msg : 'User removed successfully',
                data : verifyTask
            });

        }catch(error){
            throw error;
        }

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                success: false,
                msg: `${error.message}`
            });
        }
    }
}

// Deleting a task

exports.deleteIndividualTask = async (req, res)=>{
    try{

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                success: false,
                msg: `${error.message}`
            });
        }
    }
} 