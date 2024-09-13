export interface IUser {
    name:string;
    email:string;
    password:string;
}

export interface IUserToken {
    message?:string;
    token:string;
    user:IUser;
    suer_id?:number
}