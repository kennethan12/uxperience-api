import { repository } from "@loopback/repository";
import { ProductRepository } from "../repositories/product.repository";
import { post, requestBody, get, param } from "@loopback/rest";
import { Product } from "../models/product";
import { MenuRepository } from "../repositories/menu.repository";
import { Menu } from "../models/menu";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class ProductListController {

  constructor(
    @repository(ProductRepository.name) private productRepo: ProductRepository,
    @repository(MenuRepository.name) private menuRepo: MenuRepository
  ) { }

  @post("/addproduct")
  async createProduct(@requestBody() product: Product, menu: Menu
  ) {

    let createdProduct = await this.productRepo.create({
      name: product.name,
      description: product.description,
      price: menu.price,
      date_time: menu.date_time,
    });

    return createdProduct;

  }

  @get("/product")
  async findProduct(
    @param.query.string("name") name: string
  ): Promise<Array<Product>> {

    return await this.productRepo.find({
      where: {
        name
      }
    })
  }

  @get("/allproducts")
  async getAllUsers(): Promise<Array<Product>> {

    return await this.productRepo.find();
  }
}
