
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
    setProperty((prevProperty) => ({ ...prevProperty, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(property);
    setProperty({ id: 0, area: 0, address: '' }); // Limpa o formulário após o envio
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="area"
        value={property.area}
        onChange={handleChange}
        placeholder="Area"
        required
      />
      <input
        type="text"
        name="address"
        value={property.address}
        onChange={handleChange}
        placeholder="Address"
        required
      />
      <button type="submit">{initialData ? 'Edit Property' : 'Create Property'}</button>
    </form>
  );
};

export default PropertyForm;
