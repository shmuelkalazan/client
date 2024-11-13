import { launchType } from "./launchType";
import { Ilocation } from "../user/location";

export interface Ilanch {
  _id: string;
  type: launchType;
  to: Ilocation;
  intercepted: boolean;
  interceptedBy: string;
}
