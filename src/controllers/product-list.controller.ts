import { repository } from "@loopback/repository";
import { ProductRepository } from "../repositories/product.repository";
import { post, requestBody, get, param } from "@loopback/rest";
import { Product } from "../models/product";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class ProductListController {

  constructor(
    @repository(ProductRepository.name) private productRepo: ProductRepository
  ) { }

  @post("/addproduct")
  async createProduct(
    @requestBody() product: Product
  ): Promise<Product> {

    let createdProduct = await this.productRepo.create(product);
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
