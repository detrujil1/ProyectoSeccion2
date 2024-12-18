import locationController from '../../controllers/locationController.js';
import location from '../../models/location.js';

// Mock de la dependencia `location`
jest.mock('../../models/location.js');

describe('Location Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock de console.log
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restaura mocks después de cada prueba
  });

  // Test para getAll
  describe('getAll', () => {
    it('debería retornar todas las direcciones activas', async () => {
      const mockLocations = [{ city: 'City1' }, { city: 'City2' }];
      location.find.mockResolvedValue(mockLocations);

      await locationController.getAll(req, res);

      expect(location.find).toHaveBeenCalledWith({ deletedAt: null });
      expect(res.json).toHaveBeenCalledWith(mockLocations);
    });

    it('debería manejar errores al obtener direcciones', async () => {
      location.find.mockRejectedValue(new Error('Error de base de datos'));

      await locationController.getAll(req, res);

      expect(console.log).toHaveBeenCalledWith(new Error('Error de base de datos'));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('Direccion no encontrada');
    });
  });

  // Test para getById
  describe('getById', () => {
    it('debería retornar la dirección por ID', async () => {
      const mockLocation = { city: 'City1', zipCode: '12345', address: 'Street 123' };
      req.params.id = '1';
      location.findById.mockResolvedValue(mockLocation);

      await locationController.getById(req, res);

      expect(location.findById).toHaveBeenCalledWith('1');
      expect(res.json).toHaveBeenCalledWith(mockLocation);
    });

    it('debería manejar errores al obtener dirección por ID', async () => {
      req.params.id = '1';
      location.findById.mockRejectedValue(new Error('Error al buscar'));

      await locationController.getById(req, res);

      expect(console.log).toHaveBeenCalledWith(new Error('Error al buscar'));
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('Direccion no encontrada');
    });
  });

  // Test para create
  describe('create', () => {
    it('debería crear una nueva dirección', async () => {
      req.body = { city: 'City1', zipCode: '12345', address: 'Street 123' };
      const mockLocation = { ...req.body, _id: '1' };

      location.create.mockResolvedValue(mockLocation);

      await locationController.create(req, res);

      expect(location.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockLocation);
    });

    it('debería manejar errores al crear una dirección', async () => {
      location.create.mockRejectedValue(new Error('Error de creación'));

      await locationController.create(req, res);

      expect(console.log).toHaveBeenCalledWith('Error de creación');
      expect(res.status).toHaveBeenCalledWith(501);
      expect(res.json).toHaveBeenCalledWith('Error en el servidor');
    });
  });

  // Test para update
  describe('update', () => {
    it('debería actualizar una dirección existente', async () => {
      const mockLocation = { save: jest.fn(), city: 'Old City', zipCode: '00000', address: 'Old Address' };
      req.params.id = '1';
      req.body = { city: 'New City' };

      location.findById.mockResolvedValue(mockLocation);

      await locationController.update(req, res);

      expect(location.findById).toHaveBeenCalledWith('1');
      expect(mockLocation.city).toBe('New City');
      expect(mockLocation.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith('La direccion ha sido actualizada');
    });

    it('debería manejar el caso de dirección no encontrada al actualizar', async () => {
      req.params.id = '1';
      location.findById.mockResolvedValue(null);

      await locationController.update(req, res);

      expect(res.json).toHaveBeenCalledWith('No existe una receta con el ID mencionado');
    });
  });

  // Test para destroy
  describe('destroy', () => {
    it('debería marcar una dirección como eliminada', async () => {
      const mockLocation = { save: jest.fn() };
      req.params.id = '1';

      location.findById.mockResolvedValue(mockLocation);

      await locationController.destroy(req, res);

      expect(location.findById).toHaveBeenCalledWith('1');
      expect(mockLocation.deletedAt).toBeDefined();
      expect(mockLocation.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith('La receta se ha eliminado');
    });

    it('debería manejar errores al eliminar una dirección', async () => {
        location.findById.mockRejectedValue(new Error('Error al eliminar'));
      
        await locationController.destroy(req, res);
      
        expect(console.log).toHaveBeenCalledWith('Error al eliminar'); // Cambiado
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith('Direccion no encontrada');
      });
      
  });
});
