import React, { useState, useEffect } from 'react';
import { IProperty } from '../types/Property';

interface PropertyFormProps {
  initialData?: IProperty;
  onSubmit: (property: IProperty) => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ initialData, onSubmit }) => {
  const [property, setProperty] = useState<IProperty>({ id: 0, area: 0, address: '' });

  useEffect(() => {
    if (initialData) {
      setProperty(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProperty((prevProperty) => ({
      ...prevProperty,
      [name]: name === 'area' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(property);
    setProperty({ id: 0, area: 0, address: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        {initialData ? 'Editar Propriedade' : 'Criar Propriedade'}
      </h2>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="area">
          Área (m²)
        </label>
        <input
          type="number"
          name="area"
          id="area"
          value={property.area}
          onChange={handleChange}
          placeholder="Digite a área em metros quadrados"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2" htmlFor="address">
          Endereço
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={property.address}
          onChange={handleChange}
          placeholder="Digite o endereço da propriedade"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        {initialData ? 'Salvar' : 'Adicionar Propriedade'}
      </button>
    </form>
  );
};

export default PropertyForm;
