import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
import { MenuRepository } from "../repositories/menu.repository";
import { Menu } from "../models/menu";
export declare class ProductListController {
    private productRepo;
    private menuRepo;
    constructor(productRepo: ProductRepository, menuRepo: MenuRepository);
  
    getAllProducts(): Promise<Array<Product>>;

    getMenuItems(product_id: number): Promise<Array<Menu>>;

    getProductByLocation(locationName: string): Promise<Array<Product>>;

    createProduct(jwt: string, product: Product): Promise<Product>;

    createMenu(product_id: number, menu: Menu): Promise<Menu>;

    getAllMenuItems(product_id: number): Promise<Array<Menu>>;

    getOneMenu(menu_id: number): Promise<Menu>;
    
    getOneProduct(product_id: number): Promise<Product>;
}
