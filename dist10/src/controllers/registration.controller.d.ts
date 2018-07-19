import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
export declare class RegistrationController {
    private userRepo;
    constructor(userRepo: UserRepository);
    createUser(user: User): Promise<{
        user_id: number;
        email: string;
        firstname: string;
        lastname: string;
        photo_url: string;
        phone: string;
    }>;
}
