import AppError from "../../../shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";

export default class FindOrderByClientService {
  public async execute(id: number): Promise<Order[]> {
    const orderRepository = new OrderRepository();

    const pedidos = await orderRepository.findByClientId(id);

    return pedidos;
  }
}
