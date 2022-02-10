import AppError from "../../../shared/errors/AppError";
import IProductDTO from "../dtos/IProductDTO";
import Product from "../infra/typeorm/entities/Product";
import ProductRepository from "../infra/typeorm/repositories/ProductRepository";

export default class CreateProductService {
  public async execute(data: IProductDTO): Promise<Product> {
    const productRepository = new ProductRepository();

    if (data.id) {
      throw new AppError("ID não deve ser enviado no cadastro");
    }    
    
    const product = await productRepository.create(data);

    return product;
  }
}