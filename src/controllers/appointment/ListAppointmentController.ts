// No arquivo ListAppointmentController.ts
import { Request, Response } from 'express';
import { Appointment } from '@prisma/client'; // Adicione Appointment aqui
import { ListAppointmentService } from '../../services/appointment/ListAppointmentService';

class ListAppointmentController {
  async handle(req: Request, res: Response) {
    const userId = req.query.userId as string; // Ajuste para acessar o userId da URL
  

    const listAppointmentService = new ListAppointmentService();

    const listAppointments = await listAppointmentService.execute({ userId });

    // Mapear os resultados para extrair informações relevantes
    const formattedAppointments = listAppointments.map((appointment: Appointment & { user: { name: string }; employee: { contact: string, name: string, email: string, photo: string, cpf: string }; client: { contact: string, name: string, email: string, photo: string, cpf: string }; service?: { name: string, price: string } }) => ({
      id: appointment.id,
      userId: appointment.userId,
      userName: appointment.user.name,
      clientId: appointment.clientId,
      clientName: appointment.client.name,
      clientEmail: appointment.client.email,
      clientPhoto: appointment.client.photo,
      clientCpf: appointment.client.cpf,
      clientContact: appointment.client.contact,
      serviceId: appointment.serviceId,
      serviceName: appointment.service?.name,
      servicePrice: appointment.service.price,
      createdAt: appointment.created_at, 
      date_appointment: appointment.date,
      confirmation: appointment.confirmation,
      employeeName: appointment.employee.name,
      payment: appointment.payment
    }));

    return res.json(formattedAppointments);
  }
}

export { ListAppointmentController };
