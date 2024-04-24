// Importe as bibliotecas necessárias
import { Request, Response } from 'express';
import { ListEmployeeService } from '../../services/employee/ListEmployee';

class ListEmployeeController {
  async handle(req: Request, res: Response) {
    const userId =  req.query.userId as string; 

    // Crie uma instância de ListAppointmentService
    const listEmployeeService = new ListEmployeeService();

    // Chame o método execute da instância
    const listEmployee = await listEmployeeService.execute({ userId });

    return res.json(listEmployee);
  }
}

export { ListEmployeeController };
