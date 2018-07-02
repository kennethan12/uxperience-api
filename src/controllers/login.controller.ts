import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { param, get } from "@loopback/rest";
import { User } from "../models/user";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class LoginController {
  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @get("/login")
  async logIn(
    @param.query.string("email") email: string
  ): Promise<Array<User>> {

    return await this.userRepo.find({
      where: {
        email
      }
    })
  }
}
