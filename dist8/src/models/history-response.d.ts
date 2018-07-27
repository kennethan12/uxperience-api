import { Model } from "@loopback/repository";
import { Product } from "./product";
import { Menu } from "./menu";
export declare class HistoryResponse extends Model {
    product: Product;
    menu: Menu;
}
