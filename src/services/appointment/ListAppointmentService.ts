// No arquivo ListAppointmentService.ts
import { Prisma, PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

interface ListAppointmentRequest {
  userId: string;
}

class ListAppointmentService {
  async execute({ userId }: ListAppointmentRequest) {
    const listappointments = await prismaClient.appointment.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        user: true,    // incluir informações do usuário associado
        client: true,  // incluir informações do cliente associado
        service: true, // incluir informações do serviço associado
        employee: true,
      },
    });

    return listappointments;
  }
}

export { ListAppointmentService };
