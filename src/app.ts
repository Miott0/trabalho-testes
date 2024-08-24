import express from "express";
import { UserService } from "./service/UserService";
import { UserController } from "./controller/UserController";
import {
  getProperties,
  getProperty,
  addProperty,
  updateProperty,
  deleteProperty,  
} from "./controller/PropertyController";

const userServices = new UserService();
const userController = new UserController(userServices);

const app = express();

app.use(express.json());

// User routes
app.post("/users", userController.createUser);
app.get("/users/:id", userController.getUserById);
app.get("/users", userController.getAllUsers);
app.put("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

// Property routes
app.get("/properties", getProperties);
app.get("/properties/:id", getProperty);
app.post("/properties", addProperty);
app.put("/properties/:id", updateProperty);
app.delete("/properties/:id", deleteProperty);

export default app;
