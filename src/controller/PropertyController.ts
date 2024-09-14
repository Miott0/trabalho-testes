import { Request, Response } from 'express';
import { IPropertyService } from '../interface/IPropertyService';
import { IProperty } from '../interface/IProperty';

export class PropertyController {
  private propertyService: IPropertyService;

  constructor(propertyService: IPropertyService) {
    this.propertyService = propertyService;
  }

  async getProperties(req: Request, res: Response): Promise<void> {
    try {
      const properties = await this.propertyService.getProperties();
      res.status(200).json(properties);
    } catch (error: any) {
      res.status(500).json({ message: `Error fetching properties: ${error.message}` });
    }
  }

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

  async createProperty(req: Request, res: Response): Promise<void> {
    try {
      const { area, address } = req.body;
      if(!area || !address) {
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

