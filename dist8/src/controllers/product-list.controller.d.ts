import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
export declare class ProductListController {
    private productRepo;
    constructor(productRepo: ProductRepository);
    createProduct(product: Product): Promise<Product>;
    findProduct(name: string): Promise<Array<Product>>;
    getAllUsers(): Promise<Array<Product>>;
}
