
import React from 'react';
import { IProperty } from '../types/Property';

interface PropertyListProps {
  properties: IProperty[];
  onEdit: (property: IProperty) => void;
  onDelete: (id: number) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Area</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property) => (
          <tr key={property.id}>
            <td>{property.area}</td>
            <td>{property.address}</td>
            <td>
              <button onClick={() => onEdit(property)}>Edit</button>
              <button onClick={() => onDelete(property.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PropertyList;
