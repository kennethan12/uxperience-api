import { CategoryRepository } from "../repositories/category.repository";
import { Category } from "../models/category";
import { Product } from "../models/product";
import { ProductRepository } from "../repositories/product.repository";
export declare class CategoriesController {
    protected categoryRepo: CategoryRepository;
    protected productRepo: ProductRepository;
    constructor(categoryRepo: CategoryRepository, productRepo: ProductRepository);
    addCategory(category: Category): Promise<Category | null>;
    getCategoryProducts(category_id: number): Promise<Array<Product>>;
    getCategoryByID(category_id: number): Promise<Category>;
    getCategoryByName(category_name: string): Promise<Category>;
    getAllCategories(): Promise<Array<Category>>;
}
