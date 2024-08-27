import { Request, Response } from 'express';
import { PropertyService } from '../service/PropertyService';

export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  async getProperties(req: Request, res: Response) {
    const properties = await this.propertyService.getProperties();
    res.status(200).json(properties);
  }

  async getProperty(req: Request, res: Response) {
    const property = await this.propertyService.getProperty(parseInt(req.params.id, 10));
    if (property) {
      res.status(200).json(property);
    } else {
      res.status(404).send();
    }
  }

  async addProperty(req: Request, res: Response) {
    const newProperty = await this.propertyService.addProperty(req.body);
    res.status(201).json(newProperty);
  }

  async updateProperty(req: Request, res: Response) {
    const updatedProperty = await this.propertyService.updateProperty(parseInt(req.params.id, 10), req.body);
    if (updatedProperty) {
      res.status(200).json(updatedProperty);
    } else {
      res.status(404).send();
    }
  }

  async deleteProperty(req: Request, res: Response) {
    const success = await this.propertyService.deleteProperty(parseInt(req.params.id, 10));
    if (success) {
      res.status(200).json({ message: "Property deleted successfully" });
    } else {
      res.status(404).send();
    }
  }
}
