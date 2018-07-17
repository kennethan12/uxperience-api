import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
import { MenuRepository } from "../repositories/menu.repository";
import { Menu } from "../models/menu";
export declare class ProductListController {
    private productRepo;
    private menuRepo;
    constructor(productRepo: ProductRepository, menuRepo: MenuRepository);
    createProduct(jwt: string, productName: string, productDescription: string, city: string, menu: Menu): Promise<{
        menu: Menu;
        product: Product;
    }>;
    getAllProducts(): Promise<Array<Product>>;
    getMenuItems(product_id: number): Promise<Array<Menu>>;
    getProductByLocation(locationName: string): Promise<Array<Product>>;
}
