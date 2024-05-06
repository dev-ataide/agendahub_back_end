// No arquivo ListAppointmentByPaymentIsTrueController.ts
import { Request, Response } from 'express';
import { Appointment } from '@prisma/client'; // Adicione Appointment aqui
import { AppointmentPaymentIsTrue } from '../../services/dashboard/AppointmentsPaymentIsTrueService';
import { Decimal } from '@prisma/client/runtime/library';

class ListAppointmentByPaymentIsTrueController {
  async handle(req: Request, res: Response) {
    const userId = req.query.userId as string; // Ajuste para acessar o userId da URL
  

    const appointmentPaymentIsTrue = new AppointmentPaymentIsTrue();

    const listAppointments = await appointmentPaymentIsTrue.execute({ userId });

    // Mapear os resultados para extrair informações relevantes
    const formattedAppointments = listAppointments.map((appointment: Appointment & { user: { name: string }; employee: { contact: string, name: string, email: string, photo: string, cpf: string }; client: { contact: string, name: string, email: string, photo: string, cpf: string }; service?: { name: string, price: Decimal} }) => ({
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

export { ListAppointmentByPaymentIsTrueController };