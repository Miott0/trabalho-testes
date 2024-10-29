
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './swaggerConfig'; 

const app = express();

// Middleware para JSON
app.use(express.json());

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Suas outras rotas e middlewares
//app.use('/appointments', appointmentRoutes);
//app.use('/properties', propertyRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});
