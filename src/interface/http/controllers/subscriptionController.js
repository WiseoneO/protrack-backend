const SubscriptionModel = require('../../../infrastructure/database/models/subscription');
const userModel = require('../../../infrastructure/database/models/user')
const {generatePassword} = require('../../http/utils/passwordGenerator')
const HTTP_STATUS = require('http-status-codes');
const {subscriptionValidation} = require("../validations/userValidation");
const {sendNewSubscriptionMail} = require('../../../infrastructure/libs/mailer')

exports.activateSub = async (req, res)=>{
    const taskType = req.query.taskType;
    const {full_name, description,amount,plan,payment_status} = req.body;
    
    try{
        //validating payload
        const {error} = subscriptionValidation({
            full_name,description,
            amount,plan,
            payment_status
        });
        if(error){
            return res.status(400).json({
                success : false,
                message : error.details[0].message
            });
        }

        if(taskType === 'Team'){;
            if(req.body.payment_status !== 'paid') throw Error (`Value of payment status must be paid`);
            const invoiceNumber = generatePassword();
            let startDate = new Date();
            let endDate = new Date();

            // setting the expiration date
            if(req.body.plan == 'one'){
                endDate.setMonth(startDate.getMonth() + 1);
            }else if(req.body.plan == 'six'){
                endDate.setMonth(startDate.getMonth() + 6);
            }

            let payload = {
                ...req.body,
                userId : req.user._id,
                invoiceNumber : invoiceNumber,
                taskType : taskType,
                start_date : startDate,
                end_date : endDate
            }

            // checking existing subscription
            const isSubscribed = await SubscriptionModel.find({userId : req.user._id});
            isSubscribed.map((item)=> {
                const today = startDate.getTime();
                const endDate = item.end_date.getTime() //End date for existing subscription
                if(endDate > today) throw Error ('user already have an active subscription')
            });

            // finding current user details
            const user = await userModel.findOne(
                {_id : req.user._id, isDeleted : false},
                {password: 0 }
                );
            
            // newSubscription
            const newSub = await SubscriptionModel.create(payload);

            // sending subscription email
            try{
                await sendNewSubscriptionMail(
                    user.email,
                    user.full_name,
                    newSub.plan,
                    newSub.end_date,
                    newSub.invoiceNumber
                    );
            }catch(error){
                throw error;
            }

            delete user._doc.password;
            res.status(HTTP_STATUS.StatusCodes.CREATED).json({
                success: true,
                msg: `user successfully subscribed`,
                data: newSub,
            });
        }else if(taskType === 'Organization'){
            if(req.body.payment_status !== 'paid') throw Error (`Value of payment statue must be paid`);
            const invoiceNumber = generatePassword();
            let startDate = new Date();
            let endDate = new Date();

            // setting the expiration date
            if(req.body.plan == 'one'){
                endDate.setMonth(startDate.getMonth() + 1);
            }else if(req.body.plan == 'six'){
                endDate.setMonth(startDate.getMonth() + 6);
            }

            let payload = {
                ...req.body,
                userId : req.user._id,
                invoiceNumber : invoiceNumber,
                start_date : startDate,
                end_date : endDate
            }

            // checking existing subscription
            const isSubscribed = await SubscriptionModel.find({userId : req.user._id});
            isSubscribed.map((item)=> {
                const today = startDate.getTime();
                const endDate = item.end_date.getTime() //End date for existing subscription
                if(endDate > today) throw Error ('user already have an active subscription')
            });

            // finding current user details
            const user = await userModel.findOne(
                {_id : req.user._id, isDeleted : false},
                {password: 0 }
                );
           
            // newSubscription
            const newSub = await SubscriptionModel.create(payload);

            // sending subscription email
            try{
                await sendNewSubscriptionMail(
                    user.email,
                    user.full_name,
                    newSub.plan,
                    newSub.end_date,
                    newSub.invoiceNumber
                    );
            }catch(error){
                throw error;
            }

            delete user._doc.password;
            res.status(HTTP_STATUS.StatusCodes.CREATED).json({
                success: true,
                msg: `user successfully subscribed`,
                data: user,
            });
        }else{
            throw Error ('Select a plan')
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

exports.getUserSubscriptions = async (req, res) =>{
    try{
        const userId = req.params.id;
        const user_subscription = await SubscriptionModel.find({userId}).sort({createdAt : -1});
        if(!user_subscription) throw Error ('Subscription not found');
        res.status(HTTP_STATUS.StatusCodes.ACCEPTED).json({
            success : true,
            msg : user_subscription
        })
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({
                success : false,
                msg :`${error.message}`
            })
        }
    }
}