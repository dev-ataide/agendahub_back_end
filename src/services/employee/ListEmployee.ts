import prismaClient from "../../prisma";

interface ListEmployeeRequest {
    userId: string;
  }


class ListEmployeeService{

    async execute({userId}:ListEmployeeRequest ){
        const orders = await prismaClient.employee.findMany({
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

export {ListEmployeeService}