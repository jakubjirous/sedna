import { ITag } from "./tag";

export interface IMovie {
    id: string,
    name: string,
    created_at: string,
    tags?: ITag[]
}
