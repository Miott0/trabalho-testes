import express from "express";
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { PropertyService } from "./service/PropertyService";
import { PropertyController } from "./controller/PropertyController";
import { IUserRepository } from "./interface/IUserRepository";
import { UserRepository } from "./repositories/UserRepository";
import { IPropertyRepository } from './interface/IPropertyRepository';
import { PropertyRepository } from "./repositories/PropertyRepository";
import { IAppointmentRepository } from "./interface/IAppointmentRepository";
import { AppointmentRepository } from "./repositories/AppointmentRepository";
import { Appointment } from "./entities/appointment";
import { AppointmentService } from "./service/AppointmentService";
import { AppointmentController } from "./controller/AppointmentController";

// Create instances of repositories and services
const userRepository: IUserRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const propertyRepository : IPropertyRepository = new PropertyRepository()
const propertyService = new PropertyService(propertyRepository);
const propertyController = new PropertyController(propertyService);

const appointmentRepository : IAppointmentRepository = new AppointmentRepository()
const appointmentService = new AppointmentService(appointmentRepository,  userService, propertyService);
const appointmentController = new AppointmentController(appointmentService);

// Create the Express app
const app = express();
app.use(express.json());

// User routes
app.post("/users", (req, res) => userController.createUser(req, res));
app.get("/users/:id", (req, res) => userController.getUserById(req, res));
app.get("/users", (req, res) => userController.getAllUsers(req, res));
app.put("/users/:id", (req, res) => userController.updateUser(req, res));
app.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

// Property routes
app.get("/properties", (req, res) => propertyController.getProperties(req, res));
app.get("/properties/:id", (req, res) => propertyController.getProperty(req, res));
app.post("/properties", (req, res) => propertyController.createProperty(req, res));
app.put("/properties/:id", (req, res) => propertyController.updateProperty(req, res));
app.delete("/properties/:id", (req, res) => propertyController.deleteProperty(req, res));

//Appointments routes
app.get("/appointments", (req, res) => appointmentController.getAppointments(req, res));
app.get("/appointments/:id", (req, res) => appointmentController.getAppointments(req, res));
app.post("/appointments", (req, res) => appointmentController.createAppointment(req, res));
app.put("/appointments/:id", (req, res) => appointmentController.updateAppointment(req, res));
app.delete("/appointments/:id", (req, res) => appointmentController.deleteAppointment(req, res));

export default app;