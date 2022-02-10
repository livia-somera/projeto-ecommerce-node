import { Request, Response } from "express";
import FindOrderByIdService from "../../../services/FindOrderByIdSevice";
import CreateOrderService from "../../../services/CreateOrderSevice";
import FindAllOrdersService from "../../../services/FindAllOrdersService";
import FindOrderByClientService from "../../../services/FindOrderByClientService";
import UpdateOrderService from "../../../services/UpdateorderService";

class OrderController {
  async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createOrderService = new CreateOrderService();

    const product = await createOrderService.execute(data);

    return response.json(product);
  }

  async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findOrderService = new FindOrderByIdService();

    const product = await findOrderService.execute(Number(id));

    return response.json(product);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listAllOrdersService = new FindAllOrdersService();

    const products = await listAllOrdersService.execute();

    return response.json(products);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;
    const { id } = request.params; // desestruturação

    const updateOrderService = new UpdateOrderService();

    const data_to_update = {
      ...data, // rest / spread operator
      id: Number(id),
    };

    const client = await updateOrderService.execute(data_to_update);

    return response.json(client);
  }

  async findByClientId(request: Request, response: Response) {
    const { id } = request.params;

    const pedidos = await new FindOrderByClientService().execute(Number(id));

    return response.json(pedidos);
  }
}

export default new OrderController();
