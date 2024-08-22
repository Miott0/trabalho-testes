import express from 'express';
import { createUser, getUser, getAllUsers, updateUser, deleteUser } from './controller/UserController';

const app = express();

app.use(express.json());

app.post('/users', createUser);
app.get('/users/:id', getUser);
app.get('/users', getAllUsers);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

export default app;
