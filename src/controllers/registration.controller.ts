import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { post, requestBody, HttpErrors } from "@loopback/rest";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class RegistrationController {
  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post("/registration")
  async createUser(
    @requestBody() user: User
  ): Promise<User> {
    if (!user.email || !user.password) {
      throw new HttpErrors.BadRequest('missing data');
    }

    // Check that user does not already exist
    let userExists: boolean = !!(await this.userRepo.count({ email: user.email }));

    if (userExists) {
      throw new HttpErrors.BadRequest('user already exists');
    }

    let createdUser = await this.userRepo.create(user);
    return createdUser;

  }
}
