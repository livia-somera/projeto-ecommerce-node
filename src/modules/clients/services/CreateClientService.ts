import AppError from "../../../shared/errors/AppError";
import IClientDTO from "../dtos/IClientDTO";
import Client from "../infra/typeorm/entities/Client";
import ClientRepository from "../infra/typeorm/repositories/ClientRepository";
import FindByCPFService from "./FindByCPFService";

export default class CreateClientService {
  public async execute(data: IClientDTO): Promise<Client> {
    const clientRepository = new ClientRepository();
    const findByCpfService = new FindByCPFService();

    if (data.id) {
      throw new AppError("ID não deve ser enviado no cadastro");
    }

    await findByCpfService.execute(data.cpf);

    const client = await clientRepository.create(data);

    return client;
  }
}
