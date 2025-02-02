import mongoose from 'mongoose';
import logger from '../src/utils/logger';

const connectDB = async () => {
    const uri = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGO_URI 
    : process.env.MONGO_URI;

    try {
        const conn = await mongoose.connect(uri || '');
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1);
    }
};

export default connectDB;

