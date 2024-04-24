import prismaClient from '../../prisma'

interface ClientRequest {
    photo : string,
    name : string,
    email :  string,
    contact : string,
    observer : string,
    cpf : string,
    userId : string,

}


class CreateClientService{
    async execute({ photo, name, email,contact, observer, cpf, userId }: ClientRequest){
  
      // verificar se ele enviou um email
      if(!email || !cpf){
        throw new Error("Email or CPF incorrect")
        
      }
  
      //Verificar se esse email já está cadastrado na plataforma
      const clientAlreadyExists = await prismaClient.client.findFirst({
        where:{
          email: email
        }
      })
  
      if(clientAlreadyExists){
        throw new Error("User already exists")
      }
    
      const client = await prismaClient.client.create({
        data:{
          photo : photo,
          name: name,
          email: email,
          contact: contact,
          observer : observer,
          cpf : cpf,
          userId: userId,
        }
      })
  
  
      return client;
    }
  }
  
  export { CreateClientService }