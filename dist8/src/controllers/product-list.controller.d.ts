import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
import { MenuRepository } from "../repositories/menu.repository";
import { Menu } from "../models/menu";
import { TransactionRepository } from "../repositories/transaction.repository";
export declare class ProductListController {
    private productRepo;
    private menuRepo;
    private transactionRepo;
    private menuArray;
    private productArray;
    constructor(productRepo: ProductRepository, menuRepo: MenuRepository, transactionRepo: TransactionRepository);
    createProduct(jwt: string, product: Product): Promise<Product>;
    createMenu(product_id: number, menu: Menu): Promise<Menu>;
    getAllProducts(): Promise<Array<Product>>;
    getAllMenuItems(product_id: number): Promise<Array<Menu>>;
    getProductByLocation(locationName: string): Promise<Array<Product>>;
    getOneMenu(menu_id: number): Promise<Menu>;
    deleteMenu(menu_id: number): Promise<boolean>;
    getOneProduct(product_id: number): Promise<Product>;
    getUserProducts(user_id: number): Promise<Array<Product>>;
    getBoughtProducts(user_id: number): Promise<Array<Product>>;
    changeProductPic(downloadURL: string, product_id: string): Promise<boolean>;
    updateProduct(product_id: string, product: Product): Promise<Product>;
    deleteProduct(product_id: number): Promise<boolean>;
    history(transaction_id: number): Promise<{
        menu: Menu;
        product: Product;
    }>;
}
