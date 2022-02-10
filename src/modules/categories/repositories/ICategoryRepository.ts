import ICategoryDTO from "../dtos/ICategoryDTO";
import Category from "../infra/typeorm/entities/Category";

/**
 * Interface que define quais serão os métodos do repositório de Clientes
 * Todos os métodos que o repositório terá devem ser primeiramente definidos aqui
 */
export default interface ICategoryRepository {
  /**
   * data são os dados do Cliente, deve ter do tipo IClientDTO
   * Promise<Client> é o tipo do retorno do método
   */
  create(data: ICategoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
  findById(id: number): Promise<Category | undefined>;
  update(data: ICategoryDTO): Promise<Category>;
  // delete(data: ICategoryDTO): Promise<Category>;

  // fazer outros médodos aqui
}
