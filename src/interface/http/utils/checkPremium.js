const Subscription = require("../../../infrastructure/database/models/subscription");
const HTTP_STATUS = require('http-status-codes');

const checkTeamSub = async (req, res, next)=>{
    const userId = req.user._id;
    let today = new Date();
    await Subscription.findOne({
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
const checkOrganizationSub = async (req, res, next)=>{
    const userId = req.user._id;
    let today = new Date();
    await Subscription.findOne({
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

module.exports = {checkTeamSub,checkOrganizationSub}