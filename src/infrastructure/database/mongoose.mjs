import config from "../../config/defaults.mjs";
import pino from "pino";
const logger = pino()
import mongoose from 'mongoose'
const { connect } = mongoose;

export const connectDB =  async (app)=>{
    try{
        logger.info(`Connecting to MongDB database ...`);
        connect(config.liveMongod,
            () => {
                app.listen(config.port, () => {
                    logger.info(`Server started on port ${config.port}`);
                });
            });
        logger.info("MongoDB connected Successfully.");
    }catch(error){
        logger.info('Error while connecting to the database. Try again...');
        
    }
}

export default connectDB