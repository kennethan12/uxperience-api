import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user";
import { post, requestBody, HttpErrors } from "@loopback/rest";
import * as bcrypt from 'bcrypt';

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class RegistrationController {
  constructor(
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post("/registration")
  async createUser(
    @requestBody() user: User
  ) {
    if (!user.email || !user.password || !user.firstname || !user.lastname) {
      throw new HttpErrors.BadRequest('missing data');
    }

    if (user.email.indexOf("@") == -1) {

      throw new HttpErrors.BadRequest('please input valid email');


    }

    // Check that user does not already exist
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email }
      ]
    }));

    if (userExists) {
      throw new HttpErrors.BadRequest('user already exists');
    }

    if (user.password === user.confirmPassword) {

      let hashedPassword = await bcrypt.hash(user.password, 10);

      let createdUser = await this.userRepo.create({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        password: hashedPassword,
        photo_url: user.photo_url
      });

      let createUser = {
        user_id: createdUser.user_id,
        email: createdUser.email,
        firstname: createdUser.firstname,
        lastname: createdUser.lastname,
        photo_url: createdUser.photo_url,
        phone: createdUser.phone
      };

      return createUser;
    } else {
      throw new HttpErrors.BadRequest('password does not match');
    }

  }
}
