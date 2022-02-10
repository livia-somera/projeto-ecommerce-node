import AppError from "../../../shared/errors/AppError";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";
import FindOrderByIdService from "./FindOrderByIdSevice";

export default class UpdateOrderService {
  public async execute(data: IOrderDTO): Promise<Order> {
    const orderRepository = new OrderRepository();
    const findOrderById = new FindOrderByIdService();

    if (!data.id) {
      throw new AppError("Atualização precisa do id do pedido");
    }

    await findOrderById.execute(data.id);

    const order = await orderRepository.update(data);

    return order;
  }
}
