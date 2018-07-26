import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
export declare class UsersController {
    private userRepo;
    constructor(userRepo: UserRepository);
    getAllUsers(): Promise<Array<User>>;
    getOneUser(jwt: string): Promise<User>;
    changeProfilePic(url: string, userId: number): Promise<User>;
    getAnyUser(user_id: number): Promise<User>;
    getHost(provider_id: number): Promise<User>;
}
