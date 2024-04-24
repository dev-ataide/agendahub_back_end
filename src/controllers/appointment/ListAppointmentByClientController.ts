// controllers/appointment/ListAppointmentByClientController.ts

import { Request, Response } from 'express';
import { ListAppointmentByClientService } from '../../services/appointment/ListAppointmentByClientService';

class ListAppointmentByClientController {
  async handle(req: Request, res: Response) {
    const { clientId } = req.params;

    if (!clientId) {
      return res.status(400).json({ error: 'Cliente ID não fornecido na requisição.' });
    }

    const listAppointmentByClientService = new ListAppointmentByClientService();

    try {
      const appointments = await listAppointmentByClientService.execute({ clientId });
      return res.json(appointments);
    } catch (error) {
      console.error('Erro ao listar agendamentos por cliente:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { ListAppointmentByClientController };
