import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PropertyContainer from '../components/PropertyContainer';
import * as propertyService from '../services/propertyService';
import { IProperty } from '../types/Property';

jest.mock('../services/propertyService');

describe('PropertyContainer Component', () => {
  const mockProperties: IProperty[] = [
    { id: 1, area: 100, address: '123 Main St' },
    { id: 2, area: 200, address: '456 Oak Ave' },
  ];

  beforeEach(() => {
    (propertyService.getProperties as jest.Mock).mockResolvedValue(mockProperties);
    (propertyService.createProperty as jest.Mock).mockResolvedValue({ id: 3, area: 150, address: '789 Pine Rd' });
    (propertyService.updateProperty as jest.Mock).mockResolvedValue({ id: 1, area: 120, address: '123 Main St' });
    (propertyService.deleteProperty as jest.Mock).mockResolvedValue({});
  });

  test('renders property list after fetch', async () => {
    render(<PropertyContainer />);
    await waitFor(() => {
      mockProperties.forEach((property) => {
        expect(screen.getByText(property.address)).toBeInTheDocument();
      });
    });
  });

  test('calls createProperty when adding a new property', async () => {
    render(<PropertyContainer />);
    fireEvent.change(screen.getByPlaceholderText('Area'), { target: { value: '150' } });
    fireEvent.change(screen.getByPlaceholderText('Address'), { target: { value: '789 Pine Rd' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => expect(propertyService.createProperty).toHaveBeenCalled());
  });

  test('calls deleteProperty when deleting a property', async () => {
    render(<PropertyContainer />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText('Delete')[0]);
    });
    await waitFor(() => expect(propertyService.deleteProperty).toHaveBeenCalledWith(mockProperties[0].id));
  });
});
