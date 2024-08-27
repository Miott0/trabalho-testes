import { IProperty } from "../interface/IProperty";

export class Property implements IProperty {
    id?: number;
    area?: number;
    address?: string;

    constructor(id?: number, area?: number, address?: string) {
        this.id = id;
        this.area = area;
        this.address = address;
    }
}
