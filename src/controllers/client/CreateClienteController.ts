import {Request,Response} from 'express'
import { CreateClientService } from '../../services/client/CreateClienteService';

class CreateClientController{
    async handle(req: Request, res: Response){
      const {name, email, contact, observer, cpf, userId } = req.body;
  
      const createClientService = new CreateClientService();
  
      
    if(!req.file){
      throw new Error("error upload file")
    }else{

      const { originalname, filename: photo} = req.file;

      const client = await createClientService.execute({
        photo,
        name,
        email,
        contact,
        observer,
        cpf,
        userId
      });
  
      return res.json(client)
      
    }
  }
  }
  
  export { CreateClientController }