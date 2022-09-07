const User = require("../infrastructure/models/User")

// Getting all users ADMIN =>/api/protrack.com/users/
exports.getAllUsers = async (req, res, next)=>{
    const query = req.query.new;
    try{
        const users =  query ? await User.find().sort({_id : -1}).limit(2) : await User.find() ;
    if(users.length === 0){
        return res.status(400).json({
            success : true,
            message : `No user found`
        })
    }

    res.status(200).json({
        success : true,
        total_users : users.length,
        data : users
    })

    }catch(error){
        next(error)
    }
}