import prismaClient from "../../prisma";

interface ListServicesRequest {
  userId: string;
}

class ListServicesService {
  async execute({ userId }: ListServicesRequest) {
    const services = await prismaClient.service.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        userId: true,
        
      },
      orderBy: {
        name: 'asc',
      }
    });

    return services;
  }
}

export { ListServicesService };
