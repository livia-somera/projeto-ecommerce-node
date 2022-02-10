import AppError from "../../../shared/errors/AppError";
import IOrderDTO from "../dtos/IOrderDTO";
import Order from "../infra/typeorm/entities/Order";
import OrderRepository from "../infra/typeorm/repositories/OrderRepository";
import Product from "../../products/infra/typeorm/entities/Product";
import FindProductByIdService from "../../products/services/FindProductByIdSevice";
import FindOrderByClientService from "./FindOrderByClientService";
import FindClientByIdService from "../../clients/services/FindClientByIdService";

export default class CreateOrderService {
  productRepository: any;
  public async execute(data: IOrderDTO): Promise<Order | Product> {
    const orderRepository = new OrderRepository();
    const produto = new FindProductByIdService();
    const cliente = new FindClientByIdService();
    let soma = 0;

    //não permite que o usuário insira o id do pedido
    if (data.id) {
      throw new AppError("ID não deve ser enviado no cadastro");
    }

    //um pedido deve ter pelo menos um produto
    if (data.pedido_produtos.length === 0) {
      throw new AppError("O pedido deve ter pelo menos um produto informado");
    }

    for (var i = 0; i < data.pedido_produtos.length; i++) {
      //deve ser informado a quantidade de cada produto ao fazer o pedido
      if (data.pedido_produtos[i].quantidade <= 0) {
        throw new AppError("A quantidade do produto deve ser superior a zero");
      }

      //um pedido não pode ser finalizado se algum dos produtos estiver sem o estoque necessário
      let produtos = await produto.execute(data.pedido_produtos[i].produto_id);

      if (data.pedido_produtos[i].produto_id === produtos.id) {
        if (data.pedido_produtos[i].quantidade > produtos.quantidade) {
          throw new AppError("Quantidade insuficiente em estoque");
        }
      }

      //o valor do pedido deve ser calculado pelo sistema
      soma += data.pedido_produtos[i].quantidade * produtos.preco;
    }

    const data_new = {
      ...data,
      valor: soma,
    };

    const order = await orderRepository.create(data_new);

    return order;
  }
}
