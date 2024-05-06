import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/multer'


// Controllers
    //Usuario
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailuserController } from './controllers/user/DetailUserController'
    //Cliente
import { CreateClientController } from './controllers/client/CreateClienteController';
import { ListClienteController } from './controllers/client/ListClienteController';

    //Servicos
import { CreateServiceController } from './controllers/servicos/CreateServiceController';
import { ListServicesController } from './controllers/servicos/ListServicesController';
import { UpdateServiceController } from './controllers/servicos/UpdateServiceController';


    // Appointment
import { CreateAppointmentController } from './controllers/appointment/CreateAppointmentController';
import { ListAppointmentByClientController } from './controllers/appointment/ListAppointmentByClientController';
import { ListAppointmentController } from './controllers/appointment/ListAppointmentController';


// Middlewares

import { isAuthenticated } from './middlewares/isAuthenticated'

import { ListEmployeeController } from './controllers/employee/ListEmployee';
import { CreateEmployeeController } from './controllers/employee/CreateEmployeeController';
import { CreateClientPdf } from './services/client/ClientPdfService';
import { ClientPdfController } from './controllers/client/ClientPdfController';
import { ListAppointmentByPaymentIsTrueController } from './controllers/dashboards/AppointmentsPaymentIsTrueController';
// import { CreateImageController } from './controllers/images/CreateImagesController';


const upload = multer(uploadConfig.upload("./tmp"));


const router = Router();

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated,  new DetailuserController().handle )

// -- ROTAS CLIENT --

router.post('/client', isAuthenticated,   upload.single('file'), new CreateClientController().handle)
router.get('/clientlist', isAuthenticated,  new ListClienteController().handle)
// router.post('/clientpdf', isAuthenticated, upload.array('pdf'), new ClientPdfController().handle);

// -- EMPLOYEE --

router.post('/employee', isAuthenticated,   upload.single('file'), new CreateEmployeeController().handle)
router.get('/employeelist', isAuthenticated,  new ListEmployeeController().handle)


// -- ROTAS SERVICES --

router.post('/service', isAuthenticated,  new CreateServiceController().handle)
router.get('/service', isAuthenticated,  new ListServicesController().handle)
router.put('/service/:id', isAuthenticated, new UpdateServiceController().handle);


// -- Rotas APPOINTMENT

router.post('/appointment', isAuthenticated, new CreateAppointmentController().handle)
router.get('/appointmentlist', isAuthenticated, new ListAppointmentController().handle);
router.get('/appointments/:userId/:clientId', isAuthenticated, new ListAppointmentByClientController().handle);
router.get('/appointments/paymenttrue', isAuthenticated, new ListAppointmentByPaymentIsTrueController().handle);

// -- Rotas de IMAGENS

// router.post('/images', isAuthenticated,   upload.array('file'), new CreateImageController().handle)


export { router };  