import { IUser } from "../interface/IUser";


export class User implements IUser {
    id?: number;
    name?: string;
    email: string; // email é um parâmetro obrigatório

    constructor(email: string, id?: number, name?: string) {
        this.email = email;
        this.id = id;
        this.name = name;
    }
}

