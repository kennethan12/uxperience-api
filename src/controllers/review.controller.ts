import { repository } from "@loopback/repository";
import { ReviewRepository } from "../repositories/review.repository";
import { post, param, requestBody, HttpErrors, get } from "@loopback/rest";
import { Review } from "../models/review";
import { verify } from "jsonwebtoken";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class ReviewController {
  constructor(
    @repository(ReviewRepository.name) private reviewRepo: ReviewRepository,
    @repository(ProductRepository.name) private productRepo: ProductRepository,
    @repository(UserRepository.name) private userRepo: UserRepository
  ) { }

  @post('/addreview')
  async addReview(
    @param.query.string('jwt') jwt: string,
    @param.query.number('product_id') product_id: number,
    @requestBody() review: Review
  ) {

    /* tslint:disable no-any */
    let user = null
    try {
      let payload = verify(jwt, 'shh') as any;
      user = payload.user;
    } catch (err) {
      throw new HttpErrors.Unauthorized("Invalid token")
    }

    let reviewExists: boolean = !!(await this.reviewRepo.count({
      and: [
        {
          reviewer_id: user.user_id,
          product_id: product_id
        }
      ]
    }));

    if (reviewExists) {
      throw new HttpErrors.BadRequest('review already exists');
    }

    let productReview = await this.reviewRepo.create({
      reviewer_id: user.user_id,
      product_id: product_id,
      rating: review.rating,
      description: review.description
    })

    return productReview;
  }

  @get('/addrating')
  async getRating(
    @param.query.number('product_id') product_id: number
  ): Promise<Product> {

    let reviews = await this.reviewRepo.find({
      where: {
        product_id
      }
    });

    let rating = 0;
    let reviewProduct = await this.productRepo.findById(product_id) as Product;

    for (let review of reviews) {
      rating = rating + review.rating;
    }
    rating = rating / reviews.length;

    reviewProduct.rating = rating;
    this.productRepo.save(reviewProduct);

    return reviewProduct;
  }

  @get('/getreviews')
  async getReviews(
    @param.query.number('product_id') product_id: number
  ) {
    let reviews = await this.reviewRepo.find({
      where: {
        product_id
      }
    })
    let users: Array<User> = [];
    for (let review of reviews) {
      let user = await this.userRepo.findById(review.reviewer_id)
      users.push(user)
    }

    return {
      reviews: reviews,
      users: users
    };
  }
}
