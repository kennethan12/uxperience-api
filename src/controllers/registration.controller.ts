import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { post, requestBody } from "@loopback/rest";

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

    let createdUser = await this.userRepo.create(user);
    return createdUser;

    /*
    pizza.status = "received";
    return pizza;
    */

  }
}
