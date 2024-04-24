// CreateAppointmentService
import prismaClient from '../../prisma';

interface AppointmentRequest {
  date: string;
  userId: string;
  clientId: string;
  serviceId: string;
  confirmation: boolean;
  price: string;
  employeeId: string;
  payment: boolean;
}

class CreateAppointmentService {
  async execute({ date, userId, clientId, serviceId, confirmation, price, employeeId, payment }: AppointmentRequest) {
    console.log('Processing data:', { date, userId, clientId, serviceId, confirmation, price, employeeId, payment }); // Adicione esta linha para registrar os dados processados

    // Add your validation logic here if needed
    const appointmentAlreadyExists = await prismaClient.appointment.findFirst({
      where: {
        date: date,
        employeeId: employeeId
      }
    });

    if (appointmentAlreadyExists) {
      throw new Error("appointment already exists");
    }

    // Criar o agendamento
    const appointment = await prismaClient.appointment.create({
      data: {
        date,
        userId,
        clientId,
        serviceId,
        confirmation,
        price,
        employeeId,
        payment,
      },
    });

    // Obter os detalhes do serviço para a fatura
    const service = await prismaClient.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    // Criar a fatura associada ao agendamento
    const invoice = await prismaClient.invoice.create({
      data: {
        value: parseFloat(price), // Converter o preço para um número antes de salvar na fatura
        serviceId,
        appointmentDate: date,
        appointmentId: appointment.id,
        userId,
        clientId,
      },
    });

    return { appointment, invoice }; // Retornar tanto o agendamento quanto a fatura
  }
}

export { CreateAppointmentService };
