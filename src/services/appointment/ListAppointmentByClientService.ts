// services/appointment/ListAppointmentByClientService.ts

import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

interface ListAppointmentByClientRequest {
  clientId: string;
}

class ListAppointmentByClientService {
  async execute({ clientId }: ListAppointmentByClientRequest) {
    try {
      const appointments = await prismaClient.appointment.findMany({
        where: {
          clientId: clientId,
        },
        orderBy: {
          created_at: 'asc',
        },
      });

      return appointments;
    } catch (error) {
      throw new Error(`Erro ao obter agendamentos por cliente: ${error.message}`);
    }
  }
}

export { ListAppointmentByClientService };
