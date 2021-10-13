import { ITag } from "./tag";

export interface IUser {
    id: string,
    name: string,
    created_at: string,
    tags?: ITag[]
}