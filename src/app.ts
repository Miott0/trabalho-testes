import express from "express";
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { PropertyService } from "./service/PropertyService";
import { PropertyController } from "./controller/PropertyController";
import { IUserRepository } from "./interface/IUserRepository";
import { UserRepository } from "./repositories/UserRepository";
import { IPropertyRepository } from './interface/IPropertyRepository';
import { PropertyRepository } from "./repositories/PropertyRepository";

// Create instances of repositories and services
const userRepository: IUserRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const propertyRepository : IPropertyRepository = new PropertyRepository()
const propertyService = new PropertyService(propertyRepository);
const propertyController = new PropertyController(propertyService);

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
//app.post("/properties", (req, res) => propertyController.addProperty(req, res));
app.put("/properties/:id", (req, res) => propertyController.updateProperty(req, res));
app.delete("/properties/:id", (req, res) => propertyController.deleteProperty(req, res));

export default app;