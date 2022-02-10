import { Request, Response } from "express";
import FindProductByIdService from "../../../services/FindProductByIdSevice";
import CreateProductService from "../../../services/CreateProductSevice";
import FindAllProductsService from "../../../services/FindAllProductsService";
import UpdateProductService from "../../../services/UpdateProductService";

class ProductController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute(data);

    return response.json(product);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listAllProductsService = new FindAllProductsService();

    const products = await listAllProductsService.execute();

    return response.json(products);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findProductService = new FindProductByIdService();

    const product = await findProductService.execute(Number(id));

    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { id } = request.params; // desestruturação

    const updateProductService = new UpdateProductService();

    const data_to_update = {
      ...data, // rest / spread operator
      id: Number(id),
    };

    const product = await updateProductService.execute(data_to_update);

    return response.json(product);
  }
}

export default new ProductController();
