import { ReviewRepository } from "../repositories/review.repository";
import { Review } from "../models/review";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user.repository";
export declare class ReviewController {
    private reviewRepo;
    private productRepo;
    private userRepo;
    constructor(reviewRepo: ReviewRepository, productRepo: ProductRepository, userRepo: UserRepository);
    addReview(jwt: string, product_id: number, review: Review): Promise<Review>;
    getRating(product_id: number): Promise<Product>;
    getReviews(product_id: number): Promise<{
        reviews: Review[];
        users: User[];
    }>;
}
