import swaggerJSDoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Agendamento de Propriedades',
      version: '1.0.0',
      description: 'API para gerenciar agendamentos e propriedades',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Altere para a URL base do seu servidor
      },
    ],
  },
  apis: ['./src/controller/*.ts'], // Caminho para seus arquivos onde estão as rotas
};

export const swaggerSpecs = swaggerJSDoc(swaggerOptions);