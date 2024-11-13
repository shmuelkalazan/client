import { Ilanch } from "../launch/launch"
import { Iinterception } from "../user/interception"
import { IUser } from "../user/user"

export enum DataStatus {
    LOADING = "LOADING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    IDLE = "IDLE"
}

export interface userState {
    error: string | null,
    status: DataStatus,
    user: null | IUser
}

export interface launchState {
    error: string | null,
    status: DataStatus,
    launch: null | Ilanch
}

export interface interceptionState {
    error: string | null,
    status: DataStatus,
    interceptin: Iinterception
}