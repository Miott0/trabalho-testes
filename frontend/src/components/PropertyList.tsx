import React from 'react';
import { IProperty } from '../types/Property';

interface PropertyListProps {
  properties: IProperty[];
  onEdit: (property: IProperty) => void;
  onDelete: (id: number) => void;
}

const PropertyList: React.FC<PropertyListProps> = ({ properties, onEdit, onDelete }) => {
  if (properties.length === 0) {
    return <p className="text-gray-500 text-center mt-4">Nenhuma propriedade disponível.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {properties.map((property) => (
        <div
          key={property.id}
          className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform"
        >
          <div className="mb-4">
            <img
              src="https://th.bing.com/th/id/R.fe5cb89deda3fe2da2767800d618cd48?rik=mEXaElZBlZOcOw&pid=ImgRaw&r=0"
              alt="Propriedade"
              className="w-full h-40 object-cover rounded-md"
            />
          </div>
          <h2 className="text-2xl font-bold mb-2">Área: {property.area} m²</h2>
          <p className="mb-4 text-gray-200">{property.address}</p>
          <div className="flex justify-end">
            <button
              onClick={() => onEdit(property)}
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-l-full transition-colors"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(property.id)}
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-r-full transition-colors"
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;
