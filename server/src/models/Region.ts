import mongoose, { Schema, Document } from 'mongoose';

interface IRegion extends Document {
    nameRegion: string;

}

const RegionSchema: Schema = new Schema({
    nameRegion: { type: String, required: true, unique: true},
});

export default mongoose.model<IRegion>('Region', RegionSchema, 'regions-collections');
