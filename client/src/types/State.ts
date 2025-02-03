import { City } from "./City";

export interface State {
  _id?: string;
  name: string;
  flag: string;
  population: number;
  region: string;
  isActive: boolean;
  cities?: City[];
}

export interface AddStateResponse {
  message?: string;
  state?: State;
}