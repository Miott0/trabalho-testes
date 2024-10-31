// src/components/PropertyContainer.tsx
import React, { useState, useEffect } from 'react';
import { Property } from '../types/Property';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../services/propertyService';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';

const PropertyContainer: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const fetchProperties = async () => {
    const data = await getProperties();
    setProperties(data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCreateOrUpdate = async (property: Property) => {
    if (editingProperty) {
      await updateProperty(editingProperty.id!, property);
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

  const handleEdit = (property: Property) => {
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
