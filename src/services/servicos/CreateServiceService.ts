import prismaClient from '../../prisma'

interface ServiceRequest {
  name: string,
  description: string,
  price: string,
  userId: string,

}


class CreateServiceService {
  async execute({ name, description, price, userId }: ServiceRequest) {

    // verificar se ele enviou um email
    if (!name) {
      throw new Error("Name is incorrect")

    }

    //Verificar se esse email já está cadastrado na plataforma
    const clientAlreadyExists = await prismaClient.service.findFirst({
      where: {
        name: name,
        userId : userId,
      }
    })

    if (clientAlreadyExists) {
      throw new Error("Service already exists")
    }

    const client = await prismaClient.service.create({
      data: {
        name: name,
        description: description,
        price: price,
        userId: userId,
      }
    })


    return client;
  }
}

export { CreateServiceService }