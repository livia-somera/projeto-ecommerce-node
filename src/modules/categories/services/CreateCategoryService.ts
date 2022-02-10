import AppError from "../../../shared/errors/AppError";
import ICategoryDTO from "../dtos/ICategoryDTO";
import Category from "../infra/typeorm/entities/Category";
import CategoryRepository from "../infra/typeorm/repositories/CategoryRepository";

export default class CreateCategoryService {
  public async execute(data: ICategoryDTO): Promise<Category> {
    const categoryRepository = new CategoryRepository();

    if (data.id) {
      throw new AppError("ID não deve ser enviado no cadastro");
    }

    const category = await categoryRepository.create(data);

    return category;
  }
}
