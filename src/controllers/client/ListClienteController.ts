// Importe as bibliotecas necessárias
import { Request, Response } from 'express';
import { ListClienteService } from '../../services/client/ListClienteService';

class ListClienteController {
  async handle(req: Request, res: Response) {
    const userId =  req.query.userId as string; 

    // Crie uma instância de ListAppointmentService
    const listClienteService = new ListClienteService();

    // Chame o método execute da instância
    const listCliente = await listClienteService.execute({ userId });

    return res.json(listCliente);
  }
}

export { ListClienteController };
