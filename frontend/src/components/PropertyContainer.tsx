import React, { useState, useEffect } from 'react';
import { IProperty } from '../types/Property';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../services/propertyService';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';

const PropertyContainer: React.FC = () => {
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [editingProperty, setEditingProperty] = useState<IProperty | null>(null);

  const fetchProperties = async () => {
    const data = await getProperties();
    setProperties(data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCreateOrUpdate = async (property: IProperty) => {
    if (editingProperty) {
      await updateProperty(editingProperty.id, property);
      setEditingProperty(null);
    } else {
      await createProperty(property);
    }
    fetchProperties();
  };

  const handleDelete = async (id: number) => {
    await deleteProperty(id);
    fetchProperties();
  };

  const handleEdit = (property: IProperty) => {
    setEditingProperty(property);
  };

  return (
    <div>
      <PropertyForm onSubmit={handleCreateOrUpdate} initialData={editingProperty || undefined} />
      <PropertyList properties={properties} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default PropertyContainer;
