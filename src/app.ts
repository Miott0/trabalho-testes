import express from "express";
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import { PropertyService } from "./service/PropertyService";
import { PropertyController } from "./controller/PropertyController";

const userServices = new UserService();
const userController = new UserController(userServices);

const propertyService = new PropertyService();
const propertyController = new PropertyController(propertyService);

const app = express();

app.use(express.json());

// User routes
app.post("/users", userController.createUser);
app.get("/users/:id", userController.getUserById);
app.get("/users", userController.getAllUsers);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

// Property routes
app.get("/properties", propertyController.getProperties.bind(propertyController));
app.get("/properties/:id", propertyController.getProperty.bind(propertyController));
app.post("/properties", propertyController.addProperty.bind(propertyController));
app.put("/properties/:id", propertyController.updateProperty.bind(propertyController));
app.delete("/properties/:id", propertyController.deleteProperty.bind(propertyController));

export default app;
