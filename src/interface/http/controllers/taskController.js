const teamModel = require("../../../infrastructure/database/models/teamTask");
const individualModel = require("../../../infrastructure/database/models/individualtask");
const departmentModel = require("../../../infrastructure/database/models/departmentTask");
const userModel = require("../../../infrastructure/database/models/user");
const {createTaskSchema,edit} = require("../validations/taskValidation");
const HTTP_STATUS = require('http-status-codes');
const { findOne, findById } = require("../../../infrastructure/database/models/teamTask");

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
    const created_By = req.user._id;
    // console.log(created_By)

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
            created_By
        });
        await task.members.push(created_By);
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
    const created_By = req.user._id;
    try{
        const task = await departmentModel.create({
            title,
            description,
            department,
            status,
            time_frame,
            start_date,
            created_By
        });

        await task.members.push(created_By);
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
        const creatorId = req.user._id;
        const teamTaskId = req.params.id;
        let payload = req.body;
        const { error} = edit(payload);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        const editTask = await teamModel.findById({_id : teamTaskId});
        if(!editTask) throw new Error (`Task not found!`);

        const taskAdmin =  await teamModel.findOneAndUpdate({created_By : creatorId},payload, {new : true});
        if (!taskAdmin) throw new Error('Admin with this ID does not exist');

        await taskAdmin.save();
        res.status(201).json({
            success : true,
            msg: ` Team tasks edited successfully`,
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
// Update department Task status
exports.updatedepartmentTask = async(req, res) =>{
    try{
        const creatorId = req.user._id;
        const departmentTaskId = req.params.id;
        let payload = req.body;
        const { error} = edit(payload);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        const editTask = await departmentModel.findById({_id : departmentTaskId});
        if(!editTask) throw new Error (`Task not found!`);

        const taskAdmin =  await departmentModel.findOneAndUpdate({created_By : creatorId},payload, {new : true});
        if (!taskAdmin) throw new Error('Admin with this ID does not exist');

        await taskAdmin.save();
        res.status(201).json({
            success : true,
            msg: ` Departmental tasks edited successfully`,
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

// Add TeamMembers
exports.addTeamMember = async (req, res)=>{
    try{
        const taskId = req.params.taskId;
        const creatorId = req.user._id;
        const memberId = req.params.id;
        
        const verifyTask = await teamModel.findById(taskId);
        console.log(verifyTask)

            if(verifyTask.created_By !==  creatorId ){
                throw Error('you are not permitted.')
                
            }else{
                try{
                    // const verifyUser = await userModel.findById(memberId);
                    console.log(verifyTask)
                    if(!verifyTask.members.includes(memberId)){
                        await verifyTask.updateOne({$push : {members : memberId }});
                        return res.status(HTTP_STATUS.StatusCodes.OK).json({
                            success : true,
                            msg : `New member added`,
                            data : verifyTask
                        })
                    }else{
                        throw Error('User already exist in your team.')
                    }
                }catch(error){
                    throw error;
                }
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
            const taskId = req.params.taskId;
            const creatorId = req.user._id;
            const memberId = req.params.id;
            
            const verifyTask = await departmentModel.findById(taskId);
            console.log(verifyTask)
    
                if(verifyTask.created_By !==  creatorId ){
                    throw Error('you are not permitted.')
                    
                }else{
                    try{
                        // const verifyUser = await userModel.findById(memberId);
                        console.log(verifyTask)
                        if(!verifyTask.members.includes(memberId)){
                            await verifyTask.updateOne({$push : {members : memberId }});
                            return res.status(HTTP_STATUS.StatusCodes.OK).json({
                                success : true,
                                msg : `New member added`,
                                data : verifyTask
                            })
                        }else{
                            throw Error('User already exist in your team.')
                        }
                    }catch(error){
                        throw error;
                    }
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
exports.removeTeamMember = async (req, res)=>{
    try{
        const memberId = req.params.memberId;
        const taskId = req.params.taskId;
        const creatorId = req.user._id;

        const verifyTask= await teamModel.findById(taskId);
        if(creatorId === verifyTask.created_By ){
            try{
                if(!verifyTask.members.includes(memberId)){
                    throw Error('User not found')
                }else{
                // restricting tasks creators from removing themselves
                    if(verifyTask.members[0] === memberId ) throw Error ("You cannot remove yourself");
                    // performing the removal operation
                    await verifyTask.updateOne({$pull: {members : memberId }});
                    res.status(HTTP_STATUS.StatusCodes.OK).json({
                        success : true,
                        msg : 'User removed.',
                        data : verifyTask
                    })
                }
            }catch(error){
                throw error
            }
        }else{
            throw Error('you are not permitted.')
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
exports.removeDepartmentMember = async (req, res)=>{
    try{
        const memberId = req.params.memberId;
        const taskId = req.params.taskId;
        const creatorId = req.user._id;

        const verifyTask= await departmentModel.findById(taskId);
        if(creatorId === verifyTask.created_By ){
            try{
                if(!verifyTask.members.includes(memberId)){
                    throw Error('User not found')
                }else{
                // restricting tasks creators from removing themselves
                    if(verifyTask.members[0] === memberId ) throw Error ("You cannot remove yourself");
                    // performing the removal operation
                    await verifyTask.updateOne({$pull: {members : memberId }});
                    res.status(HTTP_STATUS.StatusCodes.OK).json({
                        success : true,
                        msg : 'User removed.',
                        data : verifyTask
                    })
                }
            }catch(error){
                throw error
            }
        }else{
            throw Error('you are not permitted.')
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

// get singleuser team task tasks
exports.getSingleTask = async (req, res)=>{
    try{
        const taskId = req.params.id;
        const userId = req.user._id;
        try{
            verifyTask = await individualModel.findById(taskId);
            if(!verifyTask) throw Error('Task not found!')
            console.log(verifyTask)
            if(userId !== verifyTask.created_By) throw error (`you can't access this resource`);
            // if(userId !== verifyTask.created_By || !verifyTask.members.includes(userId)) throw error (`you can't access this resource`);
            return res.status(HTTP_STATUS.StatusCodes.OK).json({
                success : true,
                msg: `Data retrived`,
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

// Get All specific User Task
exports.allUserTasks = async (req, res)=>{
    // const userId = req.params.id;
    try{
        const userTasks = await individualModel.find({creaded_By : req.user._id });
        if(!userTasks) throw Error ("You have not created any task yet!");
        res.status(HTTP_STATUS.StatusCodes.OK).json({
            success : true,
            msg : `Data retrieved successfully`,
            totalTask : userTasks.length,
            data : userTasks,
        })

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                    success: false,
                    msg: `${error}`
                });
            }  
    }
}