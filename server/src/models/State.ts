import mongoose, { Schema, Document } from "mongoose";

export interface ICity extends Document {
    cityName: string;
    isActive: boolean;
    stateId: mongoose.Types.ObjectId;
}

export interface IState extends Document {
  _id: string;
  name: string;
  flag: string;
  population: number;
  region: string;
  isActive: boolean;
  cities: ICity[]; 
}

const CitySchema: Schema = new Schema({
    cityName: { 
        type: String, 
        required: true, 
        minlength: 2,
        validate: {
          validator: function(v: string) {
              return /^[\p{L}\s\-]+$/u.test(v);
          },
          message: 'City name can only contain letters from any language, spaces, and hyphens.'
      }
    },
    isActive: { type: Boolean, default: true },
    stateId: { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true }
});

const StateSchema = new Schema<IState>({
  name: { type: String, required: true },
  flag: { type: String, required: true },
  population: { type: Number, required: true },
  region: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  cities: [{ type: Schema.Types.ObjectId, ref: "City" }], 
});

export const City = mongoose.model<ICity>("City", CitySchema, "cities-collections");
export const State = mongoose.model<IState>("State", StateSchema, "states-collections");
