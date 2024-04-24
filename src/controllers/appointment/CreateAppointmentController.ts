import { Request, Response } from "express";
import { CreateAppointmentService } from "../../services/appointment/CreateAppointmentService";

// CreateAppointmentController
class CreateAppointmentController {
    async handle(req: Request, res: Response) {
      const { data, userId, clientId, serviceId, confirmation, price, employeeId, payment } = req.body;
      const createAppointmentService = new CreateAppointmentService();
      console.log('Received data:', req.body); // Adicione esta linha para registrar os dados recebidos

      const appointment = await createAppointmentService.execute({
        date: data,
        userId,
        clientId,
        serviceId,
        confirmation,
        price,
        employeeId,
        payment,
      });
  
      return res.json(appointment);
    }
  }
  
  export { CreateAppointmentController };