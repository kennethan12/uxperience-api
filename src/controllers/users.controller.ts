import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { get, param, HttpErrors, requestBody, post } from "@loopback/rest";
import { User } from "../models/user";
import { verify } from "jsonwebtoken";
import { Product } from "../models/product";

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

  @get('/user')
  async getOneUser(
    @param.query.string("jwt") jwt: string
  ) {

    let user = null;
    try {
      let payload = verify(jwt, 'shh') as any;
      user = payload.user;
    } catch (err) {
      throw new HttpErrors.Unauthorized("Invalid token")
    }

    return await this.userRepo.findById(user.user_id);
  }



  @get('/changeprofilepic')
  async changeProfilePic(
    @param.query.string("url") url: string,
    @param.query.number("userid") userId: number,
  ) {


    await this.userRepo.updateById(userId, {
      photo_url: url
    })

    return await this.userRepo.findById(userId);

  }


  @get('/anyuser')
  async getAnyUser(
    @param.query.number('user_id') user_id: number
  ) {
    let user = await this.userRepo.findById(user_id)
    return user;
  }


  @get('/producthost')
  async getHost(
    @param.query.number('provider_id') provider_id: number
  ) {

    let foundHost = await this.userRepo.findById(provider_id);
    return foundHost
  }








}


