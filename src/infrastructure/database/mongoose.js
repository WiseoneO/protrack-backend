const config = require("../../config/defaults");
const logger = require("pino")();
const mongoose = require("mongoose");

const connectDB =  async (app)=>{
    try{
        logger.info(`Connecting to MongDB database ...`);
        await mongoose.connect(config.localMongod, 
            ()=>{
                app.listen(config.port, ()=>{
                    logger.info(`Server started on port ${config.port}`)
                })
            });
        logger.info("MongoDB connected Successfully.");
    }catch(error){
        logger.info('Error while connecting to the database. Try again...');
        
    }
}

module.exports = connectDB