import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { get, param } from "@loopback/rest";
import { User } from "../models/user";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class UsersController {
  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @get("/users")
  async getAllUsers(): Promise<Array<User>> {

    return await this.userRepo.find();
  }

  @get('/user/{id}')
  async getOneUser(
    @param.query.string("id") id: string): Promise<User[]> {
    return await this.userRepo.find({
      where: {
        userId: id
      }
    });
  }
}
