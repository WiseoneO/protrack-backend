import SubscriptionModel from "../../../infrastructure/database/models/subscription.mjs";
import HTTP_STATUS from 'http-status-codes';

export const checkTeamSub = async (req, res, next)=>{
    const userId = req.user._id;
    let today = new Date();
    await SubscriptionModel.findOne({
        userId,
        end_date : {$gt: new Date(today)},
        taskType : "Team"
        
    })
    .then((isSubscribed)=>{
        if(!isSubscribed) 
        throw Error ('You require a team subscription to access this route');
        next();
    })
    .catch((error)=>{
        res.status(500).json({
             success: false, 
             msg: `${error.message}` 
            });
    })
}
export const checkOrganizationSub = async (req, res, next)=>{
    const userId = req.user._id;
    let today = new Date();
    await SubscriptionModel.findOne({
        userId,
        end_date : {$gt: new Date(today)},
        taskType : "Organization"
        
    })
    .then((isSubscribed)=>{
        if(!isSubscribed) 
        throw Error ('You require an organization subscription to access this route');
        next();
    })
    .catch((error)=>{
        res.status(500).json({
             success: false, 
             msg: `${error.message}` 
            });
    })
}

export default {checkTeamSub,checkOrganizationSub}