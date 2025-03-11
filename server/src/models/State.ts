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
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
    validate: {
      validator: function (v: string) {
        return /^[\p{L}\s\-]+$/u.test(v);
      },
      message: 'State name can only contain letters, spaces, and hyphens.'
    }
  },
  flag: {
    type: String, required: true,
    validate: {
      validator: function (v: string) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
      },
      message: 'Flag must be a valid URL.'
    }
  },
  population: { type: Number, required: true, min: [0, 'Population must be at least 0.'] },
  region: { type: String, required: true, },
  isActive: { type: Boolean, default: true },
  cities: [{ type: Schema.Types.ObjectId, ref: "City" }]
});





export const City = mongoose.model<ICity>("City", CitySchema, "cities-collections");
export const State = mongoose.model<IState>("State", StateSchema, "states-collections");
