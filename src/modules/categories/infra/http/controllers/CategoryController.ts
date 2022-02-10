import { Request, Response } from "express";

import CreateCategoryService from "../../../services/CreateCategoryService";
import DeleteCategoryService from "../../../services/DeleteCategoyService";
import FindAllCategoriesService from "../../../services/FindAllCategoriesService";
import FindCategoryByIdService from "../../../services/FindCategoryByIdService";
import UpdateCategoryService from "../../../services/UpdateCategoryService";

class CategoriesController {
    async create(request: Request, response: Response) {
        const data = request.body;
        const createCategoryService = new CreateCategoryService();
        const category = await createCategoryService.execute(data);

        return response.json(category);
    }

    async list(request: Request, response: Response): Promise<Response> {
        const listAllCategoriesService = new FindAllCategoriesService();
    
        const categories = await listAllCategoriesService.execute();
    
        return response.json(categories);
    }

    async findById(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const findCategoryById = new FindCategoryByIdService();
    
        const category = await findCategoryById.execute(Number(id));
    
        return response.json(category);
      }

      async update(request: Request, response: Response): Promise<Response> {
        const data = request.body;
        const { id } = request.params; // desestruturação
    
        const updateCategoryService = new UpdateCategoryService();
    
        const data_to_update = {
          ...data, // rest / spread operator
          id: Number(id),
        };
    
        const category = await updateCategoryService.execute(data_to_update);
    
        return response.json(category);
      }

      async delete(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
    
        const deleteCategoryService = new DeleteCategoryService();
    
        const result = await deleteCategoryService.execute(Number(id));
    
        return response.json(result);
      }
}

export default new CategoriesController();