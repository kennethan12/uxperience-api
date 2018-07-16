import { repository } from "@loopback/repository";
import { ProductRepository } from "../repositories/product.repository";
import { post, requestBody, get, param, HttpErrors } from "@loopback/rest";
import { Product } from "../models/product";
import { MenuRepository } from "../repositories/menu.repository";
import { Menu } from "../models/menu";
import { verify } from "jsonwebtoken";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class ProductListController {

  constructor(
    @repository(ProductRepository.name) private productRepo: ProductRepository,
    @repository(MenuRepository.name) private menuRepo: MenuRepository
  ) { }

  @post("/addproduct")
  async createProduct(
    @param.query.string("jwt") jwt: string,
    @param.query.string("productName") productName: string,
    @param.query.string("productDescription") productDescription: string,
    @requestBody() menu: Menu
  ) {
    let user = null;

    try {
      let payload = verify(jwt, 'shh') as any;
      user = payload.user;
    } catch (err) {
      throw new HttpErrors.Unauthorized("Invalid token")
    }

    let createdProduct = await this.productRepo.create({
      name: productName,
      description: productDescription,
      provider_id: user.id
    });

    let createdMenu = await this.menuRepo.create({
      price: menu.price,
      date: menu.date,
      time: menu.time,
      product_id: createdProduct.product_id,
      availability: true
    })

    return {
      menu: createdMenu,
      product: createdProduct
    };
  }

  @get("/allproducts")
  async getAllProducts(): Promise<Array<Product>> {

    return await this.productRepo.find();
  }

  @get('/menuinfo')
  async getMenuItems(
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
}
