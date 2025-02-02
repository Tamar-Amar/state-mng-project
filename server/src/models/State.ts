import mongoose, { Schema, Document } from 'mongoose';

interface IState extends Document {
    name: string;
    flag: string;
    population: number;
    region: string;
    isActive: boolean;
    cities: mongoose.Types.ObjectId[];

}

const StateSchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true,
        minlength: 3,
        validate: {
          validator: function(v: string) {
              return /^[\p{L}\s\-]+$/u.test(v);
          },
          message: 'Name can only contain letters from any language, spaces, and hyphens.'
      }
      },
    flag: { type: String, required: true },
    population: { type: Number, required: true, min: 0 },
    region: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }]
});


export default mongoose.model<IState>('State', StateSchema, 'states-collections');
