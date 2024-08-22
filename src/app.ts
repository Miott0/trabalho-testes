import express from "express";
import {
  createUser,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} from "./controller/UserController";
import {
  getProperties,
  getProperty,
  addProperty,
  updateProperty,
  deleteProperty,  
} from "./controller/PropertyController";


const app = express();

app.use(express.json());

// User routes
app.post("/users", createUser);
app.get("/users/:id", getUser);
app.get("/users", getAllUsers);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

// Property routes
app.get("/properties", getProperties);
app.get("/properties/:id", getProperty);
app.post("/properties", addProperty);
app.put("/properties/:id", updateProperty);
app.delete("/properties/:id", deleteProperty);

export default app;
