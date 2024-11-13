import { Ilocation } from "./location";
import { Iorganization } from "./organization";

export interface IUser {
  _id: string;
  username: string;
  password: string;
  organization: Iorganization;
  location: Ilocation;
}
