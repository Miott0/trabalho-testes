import { IUser } from "../interface/IUser";


export class User implements IUser {
    
    id: number;
    email: string;
    name: string | null;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined

    constructor(email: string, id: number, name: string) {
        this.email = email;
        this.id = id;
        this.name = name;
    }
}

