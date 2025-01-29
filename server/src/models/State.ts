import mongoose, { Schema, Document } from 'mongoose';

interface IState extends Document {
    name: string;
    flag: string;
    population: number;
    region: string;
    isActive: boolean;

}

const StateSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    flag: { type: String, required: true },
    population: { type: Number, required: true, min: 0 },
    region: { type: String, required: true },
    isActive: { type: Boolean, default: true },
});


export default mongoose.model<IState>('State', StateSchema, 'states-collections');
