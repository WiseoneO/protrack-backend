const Subscription = require("../../../infrastructure/database/models/subscription");
const HTTP_STATUS = require('http-status-codes');

const checkPremium = async (req, res)=>{
    const userId = req.user._id;
    let today = new Date();
    await Subscription.findOne({
        userId,
        end_date : {$gt: new Date(today)},
    })
    .then((isSubscribed)=>{
        if(!isSubscribed) 
        throw Error ('You require an active subscription to access this route');
        next();
    })
    .catch((error)=>{
        res.status(500).json({
             success: false, 
             msg: `${error.message}` 
            });
    })
}

module.exports = checkPremium