import e, { Request, Response } from "express";
import { IPropertyService } from "../interface/IPropertyService";
import { IProperty } from "../interface/IProperty";
import { PropertyService } from "../service/PropertyService";

const propertyService: IPropertyService = new PropertyService();

export async function getProperties(req: Request, res: Response) {
  const properties = await propertyService.getProperties();
  res.json(properties);
}

export async function getProperty(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid property ID" });
    return;
  }
  const property = await propertyService.getProperty(id);
  if (property) {
    res.json(property);
  } else {
    res.status(404).json({ message: "Property not found" });
  }
}

export async function addProperty(req: Request, res: Response) {
  const property: IProperty = {
    area: req.body.area,
    adrress: req.body.adrress,
  };
  const newProperty = await propertyService.addProperty(property);

  res.status(201).json(newProperty);
}

export async function updateProperty(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid property ID" });
    return;
  }

  const property: IProperty = {
    area: req.body.area,
    adrress: req.body.adrress,
  };
  const updatedProperty = await propertyService.updateProperty(id, req.body);

  if (updatedProperty) {
    res.json(updatedProperty);
  } else {    
    res.status(404).json({ message: "Property not found" });
  }
}
 
export async function deleteProperty(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid property ID" });
    return;
  }
  const isDeleted = await propertyService.deleteProperty(id);

  if (isDeleted) {
    res.json({ message: "Property deleted successfully" });
  } else {
    res.status(404).json({ message: "Property not found" });
  }
}
