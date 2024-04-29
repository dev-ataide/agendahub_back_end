// controllers/appointment/ListAppointmentByClientController.ts

import { Request, Response } from 'express';
import { ListAppointmentByClientService } from '../../services/appointment/ListAppointmentByClientService';

class ListAppointmentByClientController {
  async handle(req: Request, res: Response) {
    const { userId, clientId } = req.params; // Corrigido para acessar os parâmetros da URL

    const listAppointmentByClientService = new ListAppointmentByClientService();

    try {
      const appointments = await listAppointmentByClientService.execute({ clientId, userId });
      return res.json(appointments);
    } catch (error) {
      console.error('Erro ao listar agendamentos por cliente:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { ListAppointmentByClientController };
