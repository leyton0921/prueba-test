import { IUserToken } from "./auth";

export interface IBodyResponseGetAllPosts {
    message: string;
    posts:    Datum[];
}

export interface Datum {
    id        : string;
    title     : string;
    description: string;
    user_id:string
    
}

export interface BodyRequestCreatePost{
    title : string,
    description: string;
    user_id:string
}
export interface BodyResponseCreatePost {
    message: string;
    data: Record<string, string>;
}



export interface BodyResponseGetByID{
    message:string,
    data:Record<string,string>;

}


export interface BodyrequestUpdatePost{
    title : string,
    description: string;
    user_id?: number

}

export interface BodyResponseUpdatePost{
    message:string,
    data:Record<string,string>;

}


export interface BodyResponseDeletePost{
    message:string,
    data:null
}
