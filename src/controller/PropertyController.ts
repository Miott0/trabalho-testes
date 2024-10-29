import { Request, Response } from 'express';
import { IPropertyService } from '../interface/IPropertyService';
import { IProperty } from '../interface/IProperty';

export class PropertyController {
  private propertyService: IPropertyService;

  constructor(propertyService: IPropertyService) {
    this.propertyService = propertyService;
  }

  /**
   * @swagger
   * /properties:
   *   get:
   *     summary: Retorna todos os imóveis
   *     tags: [Properties]
   *     responses:
   *       200:
   *         description: Lista de propriedades.
   *       500:
   *         description: Erro ao buscar propriedades.
   */
  async getProperties(req: Request, res: Response): Promise<void> {
    try {
      const properties = await this.propertyService.getProperties();
      res.status(200).json(properties);
    } catch (error: any) {
      res.status(500).json({ message: `Error fetching properties: ${error.message}` });
    }
  }

  /**
   * @swagger
   * /properties/{id}:
   *   get:
   *     summary: Retorna uma propriedade específica pelo ID
   *     tags: [Properties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da propriedade
   *     responses:
   *       200:
   *         description: Dados da propriedade.
   *       400:
   *         description: ID de propriedade inválido.
   *       404:
   *         description: Propriedade não encontrada.
   *       500:
   *         description: Erro ao buscar propriedade.
   */
  async getProperty(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid property ID" });
        return;
      }
      const property = await this.propertyService.getProperty(id);
      if (property) {
        res.status(200).json(property);
      } else {
        res.status(404).json({ message: "Property not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: `Error fetching property: ${error.message}` });
    }
  }

  /**
   * @swagger
   * /properties:
   *   post:
   *     summary: Cria uma nova propriedade
   *     tags: [Properties]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               area:
   *                 type: number
   *                 description: Área do imóvel
   *               address:
   *                 type: string
   *                 description: Endereço do imóvel
   *             required:
   *               - area
   *               - address
   *     responses:
   *       201:
   *         description: Propriedade criada com sucesso.
   *       400:
   *         description: Área e endereço são obrigatórios.
   *       500:
   *         description: Erro ao criar propriedade.
   */
  async createProperty(req: Request, res: Response): Promise<void> {
    try {
      const { area, address } = req.body;

      if (!area || !address) {
        res.status(400).json({ message: "Area and address are required" });
        return;
      }
      const propertyData: IProperty = req.body;
      const newProperty = await this.propertyService.createProperty(propertyData);
      res.status(201).json(newProperty);
    } catch (error: any) {
      res.status(500).json({ message: `Error creating property: ${error.message}` });
    }
  }

  /**
   * @swagger
   * /properties/{id}:
   *   put:
   *     summary: Atualiza uma propriedade existente
   *     tags: [Properties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da propriedade
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               area:
   *                 type: number
   *                 description: Área do imóvel
   *               address:
   *                 type: string
   *                 description: Endereço do imóvel
   *     responses:
   *       200:
   *         description: Propriedade atualizada com sucesso.
   *       400:
   *         description: ID de propriedade inválido.
   *       404:
   *         description: Propriedade não encontrada.
   *       500:
   *         description: Erro ao atualizar propriedade.
   */
  async updateProperty(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid property ID" });
        return;
      }
      const propertyData: Partial<IProperty> = req.body;
      const updatedProperty = await this.propertyService.updateProperty(id, propertyData);
      if (updatedProperty) {
        res.status(200).json(updatedProperty);
      } else {
        res.status(404).json({ message: "Property not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: `Error updating property: ${error.message}` });
    }
  }

  /**
   * @swagger
   * /properties/{id}:
   *   delete:
   *     summary: Exclui uma propriedade
   *     tags: [Properties]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID da propriedade
   *     responses:
   *       200:
   *         description: Propriedade excluída com sucesso.
   *       400:
   *         description: ID de propriedade inválido.
   *       404:
   *         description: Propriedade não encontrada.
   *       500:
   *         description: Erro ao excluir propriedade.
   */
  async deleteProperty(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ message: "Invalid property ID" });
        return;
      }
      const success = await this.propertyService.deleteProperty(id);
      if (success) {
        res.status(200).json({ message: "Property deleted successfully" });
      } else {
        res.status(404).json({ message: "Property not found" });
      }
    } catch (error: any) {
      res.status(500).json({ message: `Error deleting property: ${error.message}` });
    }
  }
}
