const Subscription = require('../../../infrastructure/database/models/subscription');
const generatePassword = require('../../http/utils/passwordGenerator');
const HTTP_STATUS = require('http-status-codes');

exports.activateSub = async (req, res)=>{
    const taskType = req.query.taskType;
    try{
        if(taskType === 'Team'){
            if(req.body.payment_status !== 'paid')
                throw Error (`Value of payment_status must be paid`);
            const invoiceNumber = generatePassword();
            let startDate = new Date();
            let endDate = new Date();

            if(req.body.plan == `one` ){
                endDate.setMonth(startDate.getMonth() + 1);
            }

            let payload = {
                ...req.body,
                userId : req.user._id,
                invoiceNumber : invoiceNumber,
                start_date : startDate,
                end_date : endDate,
                taskType : taskType
            }

            const newSub = await Subscription.create({
                payload, plan, amount, description, payment_status
            })
            res.status(HTTP_STATUS.StatusCodes.CREATED).json({
                success: true,
                msg: `user successfully subscribed`,
                data: newSub,
              });

        }else if(taskType === 'Organization'){
            if(req.body.payment_status !== 'paid')
                throw Error (`Value of payment_status must be paid`);
            const invoiceNumber = generatePassword();
            let startDate = new Date();
            let endDate = new Date();

            if(req.body.plan == `one` ){
                endDate.setMonth(startDate.getMonth() + 1)
            }
            let payload = {
                ...req.body,
                userId : req.user._id,
                invoiceNumber : invoiceNumber,
                start_date : startDate,
                end_date : endDate,
                taskType : taskType
            }

            const newSub = await Subscription.create({
                payload, plan, amount, description, payment_status,
            })
            res.status(HTTP_STATUS.StatusCodes.CREATED).json({
                success: true,
                msg: `user successfully subscribed`,
                data: newSub,
              });
        }
        
    }catch(error){
        if(error instanceof Error){
            res.status(500)
                .json({
                    success: false,
                    msg: `${error}`
                });
            }
    }
}
