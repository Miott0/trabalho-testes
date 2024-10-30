import React from 'react';
import { IProperty } from '../types/Property';

interface PropertyListProps {
  properties: IProperty[];
  onEdit: (property: IProperty) => void;
  onDelete: (id: number) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onEdit, onDelete }) => {
  if (properties.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No properties available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-900">
            <th className="py-3 px-6 text-left font-semibold uppercase tracking-wider">Area (sq ft)</th>
            <th className="py-3 px-6 text-left font-semibold uppercase tracking-wider">Address</th>
            <th className="py-3 px-6 text-center font-semibold uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
              <td className="py-3 px-6">{property.area}</td>
              <td className="py-3 px-6">{property.address}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onEdit(property)}
                  className="bg-blue-700 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(property.id)}
                  className="bg-red-700 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyList;
