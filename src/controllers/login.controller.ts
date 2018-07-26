import { repository } from "@loopback/repository";
import { UserRepository } from "../repositories/user.repository";
import { param, get, HttpErrors, post, requestBody } from "@loopback/rest";
import { User } from "../models/user";
import { sign, verify } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class LoginController {
  constructor(
    @repository(UserRepository.name) protected userRepo: UserRepository
  ) { }

  @get('/verify')
  async verifyToken(@param.query.string('jwt') jwt: string) {
    try {
      let payload = await verify(jwt, 'shh');
      return payload;
    } catch (err) {
      throw new HttpErrors.Unauthorized("Invalid token")
    }
    // The user is authenticated and we can process
  }

  @post('/login')
  async loginUser(@requestBody() user: User) {

    // Check that email and password are both supplied
    if (!user.email || !user.password) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    // Check that email and password are valid
    let userExists: boolean = !!(await this.userRepo.count({
      and: [
        { email: user.email }
      ],
    }));

    if (!userExists) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    };

    let foundUser = await this.userRepo.findOne({
      where: {
        email: user.email
      },
    }) as User;

    if (!(await bcrypt.compare(user.password, foundUser.password))) {
      throw new HttpErrors.Unauthorized('invalid credentials');
    }

    let jwt = sign({
      user: {
        user_id: foundUser.user_id,
        email: foundUser.email,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        photo_url: foundUser.photo_url
      }
    }, 'shh', {
        issuer: 'auth.ix.co.za',
        audience: 'ix.co.za'
      });

    return {
      token: jwt
    };
  }
}

