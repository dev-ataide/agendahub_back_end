import { Request, Response } from "express";
import prismaClient from "../../prisma";

interface EmployeeRequest {
    photo: string,
    name: string,
    email: string,
    contact: string,
    observer: string,
    cpf: string,
    userId: string,
  }
  
class CreateEmployeeService {
    async execute({ photo, name, email, contact, observer, cpf, userId }: EmployeeRequest) {
        // verificar se ele enviou um email
        if (!email || !cpf) {
            throw new Error("Email or CPF incorrect")

        }

        //Verificar se esse email já está cadastrado na plataforma
        const employeeAlreadyExists = await prismaClient.employee.findFirst({
            where: {
                email: email
            }
        })

        if (employeeAlreadyExists) {
            throw new Error("User already exists")
        }

        const employee = await prismaClient.employee.create ({
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
      

        return employee;
    }
  }
  
  export { CreateEmployeeService }