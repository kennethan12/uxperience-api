import { repository } from "@loopback/repository";
import { ProductRepository } from "../repositories/product.repository";
import { post, requestBody, get, param, HttpErrors } from "@loopback/rest";
import { Product } from "../models/product";
import { MenuRepository } from "../repositories/menu.repository";
import { Menu } from "../models/menu";
import { verify } from "jsonwebtoken";
import { TransactionRepository } from "../repositories/transaction.repository";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class ProductListController {

  private menuArray: Menu[] = [];
  private productArray: Product[] = [];

  constructor(
    @repository(ProductRepository.name) private productRepo: ProductRepository,
    @repository(MenuRepository.name) private menuRepo: MenuRepository,
    @repository(TransactionRepository.name) private transactionRepo: TransactionRepository
  ) { }

  @post("/addproduct")
  async createProduct(
    @param.query.string("jwt") jwt: string,
    @requestBody() product: Product
  ) {
    let user = null;

    try {
      let payload = verify(jwt, 'shh') as any;
      user = payload.user;
    } catch (err) {
      throw new HttpErrors.Unauthorized("Invalid token")
    }

    let createdProduct = await this.productRepo.create({
      name: product.name,
      description: product.description,
      category_id: product.category_id,
      provider_id: user.id
    });

    return createdProduct
  }

  @post('/addmenu')
  async createMenu(
    @param.query.number('product_id') product_id: number,
    @requestBody() menu: Menu
  ) {

    let foundProduct = await this.productRepo.findById(product_id)

    let createdMenu = await this.menuRepo.create({
      price: menu.price,
      date: menu.date,
      time: menu.time,
      product_id: foundProduct.product_id,
      availability: true
    })

    return createdMenu
  }

  @get("/allproducts")
  async getAllProducts(): Promise<Array<Product>> {

    return await this.productRepo.find();
  }

  @get('/allmenuinfo')
  async getAllMenuItems(
    @param.query.number('product_id') product_id: number
  ): Promise<Array<Menu>> {

    let findMenuItems = this.menuRepo.find({
      where: {
        product_id,
        availability: true
      }
    })

    return findMenuItems;
  }

  @get('/menuinfo')
  async getOneMenu(
    @param.query.number('menu_id') menu_id: number
  ) {

    let findMenu = await this.menuRepo.findById(menu_id);
    return findMenu;
  }

  @get('/productinfo')
  async getOneProduct(
    @param.query.number('product_id') product_id: number
  ) {

    let foundProduct = await this.productRepo.findById(product_id);
    return foundProduct;
  }

  @get('/myproducts')
  async getUserProducts(
    @param.query.number('user_id') user_id: number
  ): Promise<Array<Product>> {
    let userProducts = await this.productRepo.find({
      where: {
        provider_id: user_id
      }
    })
    return userProducts
  }

  @get('myboughtproducts')
  async getBoughtProducts(
    @param.query.number('user_id') user_id: number
  ): Promise<Array<Product>> {
    let userTransactions = await this.transactionRepo.find({
      where: {
        customer_id: user_id
      }
    });

    for (let i = 0; i < userTransactions.length; i++) {
      let userMenu = await this.menuRepo.findById(userTransactions[i].menu_id)
      this.menuArray.push(userMenu)
    }

    for (let i = 0; i < this.menuArray.length; i++) {
      let userProduct = await this.productRepo.findById(this.menuArray[i].product_id)
      this.productArray.push(userProduct)
    }

    return this.productArray
  }
}
