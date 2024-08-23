import { PropertyService } from '../service/PropertyService';
import { IProperty } from '../interface/IProperty';

describe('PropertyService', () => {
    let propertyService: PropertyService;
    

    beforeEach(() => {
        propertyService = new PropertyService();
    });

    it('should get all properties', async () => {
        const properties: IProperty[] = [
            { id: 1, area: 100, adrress: '123 Street' },
            { id: 2, area: 200, adrress: '456 Avenue' },
        ];

        await propertyService.addProperty(properties[0]);
        await propertyService.addProperty(properties[1]);

        const result = await propertyService.getProperties();
        expect(result).toEqual(properties);
        
        expect(result).toHaveLength(2)
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
    });
})