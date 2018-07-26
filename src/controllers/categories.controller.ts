import { repository } from "@loopback/repository";
import { CategoryRepository } from "../repositories/category.repository";
import { Category } from "../models/category";
import { post, requestBody, param, get, HttpErrors } from "@loopback/rest";
import { Product } from "../models/product";
import { ProductRepository } from "../repositories/product.repository";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class CategoriesController {
  constructor(
    @repository(CategoryRepository.name) protected categoryRepo: CategoryRepository,
    @repository(ProductRepository.name) protected productRepo: ProductRepository
  ) { }

  @post('/addcategory')
  async addCategory(
    @requestBody() category: Category
  ) {

    let categoryExists: boolean = !!(await this.categoryRepo.count({
      and: [
        { name: category.name }
      ],
    }));

    if (categoryExists) {
      let existingCategory = await this.categoryRepo.findOne({
        where: {
          name: category.name
        }
      })
      return existingCategory
    };

    let newCategory = await this.categoryRepo.create({
      name: category.name
    })

    return newCategory;
  }

  @get('/categoryproducts')
  async getCategoryProducts(
    @param.query.number('category_id') category_id: number
  ): Promise<Array<Product>> {
    let categoryProducts = await this.productRepo.find({
      where: {
        category_id
      }
    })
    return categoryProducts
  }

  @get('/categorybyid')
  async getCategoryByID(
    @param.query.number('category_id') category_id: number
  ) {

    return await this.categoryRepo.findOne({
      where: {
        category_id: category_id
      }
    }) as Category;

  }

  @get('/categorybyname')
  async getCategoryByName(
    @param.query.string('category_name') category_name: string
  ) {

    return await this.categoryRepo.findOne({
      where: {
        name: category_name
      }
    }) as Category;

  }

  @get('/allcategories')
  async getAllCategories(
  ): Promise<Array<Category>> {

    let allCategories = await this.categoryRepo.find()
    return allCategories
  }
}
