import { Request, Response } from "express";
import { UpdateServiceService } from "../../services/servicos/UpdateServiceService";

class UpdateServiceController {
    async handle(req: Request, res: Response) {
        const { id, name, description, price, userId } = req.body;
        const updateServiceService = new UpdateServiceService();

        const service = await updateServiceService.execute({
            id,
            name,
            description,
            price,
            userId
        });

        return res.json(service);
    }
}

export { UpdateServiceController };
