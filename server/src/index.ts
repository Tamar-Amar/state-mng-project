import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import { fetchAndSaveStates } from './utils/fetchStates';
import { errorMiddleware } from './middlewares/errorMiddleware';
import helmet from 'helmet';
import stateRoutes from './routes/stateRoutes';
import logger from './utils/logger';
import regionRoutes from './routes/regionRoutes';
import userRoutes from 'routes/userRoutes';
import permissionRoutes from 'routes/permissionRoutes';
import permissionRequestRoutes from 'routes/permissionRequestRoutes';
import authRoutes from 'routes/authRoutes';
//import xssClean from 'xss-clean';

const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const PORT = process.env.PORT || (process.env.NODE_ENV === 'development' ? 5000 : undefined);

const app = express();
app.use(helmet());
//app.use(xssClean());

app.use(cors());
app.use(express.json());
app.use('/api/states', stateRoutes);
app.use('/api/regions', regionRoutes);
app.use('/api/users', userRoutes); 
app.use('/api/permissions', permissionRoutes); 
app.use('/api/permission-requests', permissionRequestRoutes);
app.use('/uploads', express.static('public/uploads'));
app.use('/api/auth', authRoutes);


app.get('/', (req, res) => {
    logger.info('Root route accessed');
    res.send('Server is running');
});

app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'test') {
    connectDB().then(() => {
        fetchAndSaveStates();
        app.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    }).catch(error => {
        console.error('MongoDB connection error:', error);
    });
}

export default app;
