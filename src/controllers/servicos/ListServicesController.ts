// ... outras importações
import { Request, Response } from 'express';
import { ListServicesService } from '../../services/servicos/ListServicesService';

class ListServicesController {
  async handle(req: Request, res: Response) {
    const userId = req.query.userId as string; // Ajuste para acessar o userId da URL

    try {
      const listServicesService = new ListServicesService();
      const listService = await listServicesService.execute({ userId });

      return res.json(listService);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao obter os serviços.' });
    }
  }
}

export { ListServicesController };
