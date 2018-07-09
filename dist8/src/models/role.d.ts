import { Entity } from "@loopback/repository";
export declare class Role extends Entity {
    role_id: number;
    name: string;
    getRoleId(): number;
}
