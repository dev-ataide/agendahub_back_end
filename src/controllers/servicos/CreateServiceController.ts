import { Request, Response } from "express";
import { CreateServiceService } from "../../services/servicos/CreateServiceService";

class CreateServiceController {
    async handle(req : Request, res: Response){
        const {name, description, price, userId} = req.body;
        const createServiceService = new CreateServiceService();

        const service = await createServiceService.execute({
            name,
            description,
            price,
            userId
        })

        return res.json(service)

    }
}

export {CreateServiceController}