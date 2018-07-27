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

    /* tslint:disable no-any */
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
      provider_id: user.user_id,
      city: product.city,
      photo_url: product.photo_url
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


  //NEW
  @get("/productbylocation")
  async getProductByLocation(

    @param.query.string("city") locationName: string

  ): Promise<Array<Product>> {

    return await this.productRepo.find({

      where: {
        city: locationName
      }

    });
  }




  @get('/menuinfo')
  async getOneMenu(
    @param.query.number('menu_id') menu_id: number
  ) {

    let findMenu = await this.menuRepo.findById(menu_id);
    return findMenu;
  }


  @get('/deletemenu')
  async deleteMenu(
    @param.query.number('menu_id') menu_id: number
  ) {

    return await this.menuRepo.deleteById(menu_id);
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

    /* tslint:disable prefer-for-of */
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

  @get('/changeproductpic')
  async changeProductPic(
    @param.query.string('url') downloadURL: string,
    @param.query.string('productID') product_id: string,
  ) {

    return await this.productRepo.updateById(product_id, {
      photo_url: downloadURL
    });


  }



  @post('/updateproduct')
  async updateProduct(
    @param.query.string('productid') product_id: string,
    @requestBody() product: Product
  ): Promise<Product> {

    if (product.name) {

      await this.productRepo.updateById(product_id, {
        name: product.name
      });

    }

    if (product.description) {

      await this.productRepo.updateById(product_id, {
        description: product.description
      });

    }

    if (product.category_id) {

      await this.productRepo.updateById(product_id, {
        category_id: product.category_id
      });

    }


    return await this.productRepo.findById(product_id);

  }


  @get('/deleteproduct')
  async deleteProduct(
    @param.query.number('productid') product_id: number
  ) {

    let menus: Menu[] = await this.menuRepo.find({
      where: {
        product_id: product_id
      }

    }) as Menu[];

    for (let i = 0; i < menus.length; ++i) {
      await this.menuRepo.delete(menus[i]);
    }


    return await this.productRepo.deleteById(product_id);

  }

  @get('/history')
  async history(
    @param.query.number('transaction_id') transaction_id: number
  ) {
    let foundTransaction = await this.transactionRepo.findById(transaction_id)
    let foundMenu = await this.menuRepo.findById(foundTransaction.menu_id);
    let foundProduct = await this.productRepo.findById(foundMenu.product_id)

    return {
      menu: foundMenu,
      product: foundProduct
    };
  }

}

