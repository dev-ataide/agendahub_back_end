import {Request,Response} from 'express'
import { CreateEmployeeService } from '../../services/employee/CreateEmployeeService';

class CreateEmployeeController{
    async handle(req: Request, res: Response){
      const {name, email, contact, observer, cpf, userId } = req.body;
  
      const createEmployeeService = new CreateEmployeeService();
  
      
    if(!req.file){
      throw new Error("error upload file")
    }else{

      const { originalname, filename: photo} = req.file;

      const employee = await createEmployeeService.execute({
        photo,
        name,
        email,
        contact,
        observer,
        cpf,
        userId
      });
  
      return res.json(employee)
      
    }
  }
  }
  
  export { CreateEmployeeController }