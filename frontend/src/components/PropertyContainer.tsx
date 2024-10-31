import React, { useState, useEffect } from 'react';
import { Property } from '../types/Property';
import { getProperties, createProperty, updateProperty, deleteProperty } from '../services/propertyService';
import PropertyForm from './PropertyForm';
import PropertyList from './PropertyList';
import ToastAlert from './ToastAlert'; // Importe o ToastAlert

const PropertyContainer: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; show: boolean }>({
    message: '',
    type: 'success',
    show: false,
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, show: true });
  };

  const fetchProperties = async () => {
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (error) {
      console.error('Erro ao buscar propriedades:', error);
      showToast('Erro ao buscar propriedades', 'error');
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCreateOrUpdate = async (property: Property) => {
    try {
      if (editingProperty) {
        await updateProperty(editingProperty.id!, property);
        showToast('Propriedade atualizada com sucesso!', 'success');
        setEditingProperty(null);
      } else {
        await createProperty(property);
        showToast('Propriedade criada com sucesso!', 'success');
      }
      fetchProperties();
    } catch (error) {
      console.error('Erro ao criar ou atualizar a propriedade:', error);
      showToast('Erro ao criar ou atualizar a propriedade', 'error');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProperty(id);
      fetchProperties();
      showToast('Propriedade deletada com sucesso!', 'success');
    } catch (error) {
      console.error('Erro ao deletar a propriedade:', error);
      showToast('Erro ao deletar a propriedade', 'error');
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
  };

  return (
    <div>
      <PropertyForm onSubmit={handleCreateOrUpdate} initialData={editingProperty || undefined} />
      <PropertyList properties={properties} onEdit={handleEdit} onDelete={handleDelete} />
      {toast.show && (
        <ToastAlert
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default PropertyContainer;
