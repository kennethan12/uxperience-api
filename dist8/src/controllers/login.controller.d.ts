import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
export declare class LoginController {
    protected userRepo: UserRepository;
    constructor(userRepo: UserRepository);
    verifyToken(jwt: string): Promise<string | object>;
    loginUser(user: User): Promise<{
        token: string;
    }>;
}
