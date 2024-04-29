// services/appointment/ListAppointmentByClientService.ts

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

interface ListAppointmentByClientRequest {
  userId: string;
  clientId: string;
}

class ListAppointmentByClientService {
  async execute({ clientId, userId }: ListAppointmentByClientRequest) {
    try {
      const appointments = await prismaClient.appointment.findMany({
        where: {
          userId: userId,
          clientId: clientId,
        },
        orderBy: {
          created_at: 'asc',
        },
        include:{
          client: true,
          service: true,
          employee: true,
          
        }
      });

      return appointments;
    } catch (error) {
      throw new Error(`Erro ao obter agendamentos por cliente: ${error.message}`);
    }
  }
}

export { ListAppointmentByClientService };
