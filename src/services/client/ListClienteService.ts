import prismaClient from "../../prisma";

interface ListClienteRequest {
    userId: string;
  }


class ListClienteService{

    async execute({userId}:ListClienteRequest ){
        const orders = await prismaClient.client.findMany({
            where:{
                userId:userId,
                
            },
            orderBy:{
                name : 'asc',
            }
        })

        return orders;

    }
}

export {ListClienteService}