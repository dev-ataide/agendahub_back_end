import prismaClient from '../../prisma';

interface UpdateServiceRequest {
    id: string;
    name: string;
    description: string;
    price: string;
    userId: string;
}

class UpdateServiceService {
    async execute({ id, name, description, price, userId }: UpdateServiceRequest) {
        // Verificar se o serviço com o ID especificado existe
        const service = await prismaClient.service.findUnique({
            where: {
                id: id
            }
        });

        if (!service) {
            throw new Error("Service not found");
        }

        // Atualizar os campos do serviço
        const updatedService = await prismaClient.service.update({
            where: {
                id: id
            },
            data: {
                name,
                description,
                price,
                userId
            }
        });

        return updatedService;
    }
}

export { UpdateServiceService };
