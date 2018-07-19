import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
export declare class UsersController {
    private userRepo;
    constructor(userRepo: UserRepository);
    getAllUsers(): Promise<Array<User>>;
    getOneUser(jwt: string): Promise<User>;
    getHost(provider_id: string): Promise<User>;
}
