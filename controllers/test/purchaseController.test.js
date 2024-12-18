// Test para PurchaseController
import purchaseController from '../../controllers/purchaseController.js';
import Purchase from '../../models/purchaseOrden.js';

jest.mock('../../models/purchaseOrden.js');

describe('Purchase Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getAll', () => {
    it('debería retornar todas las órdenes de compra', async () => {
      const mockPurchases = [{ id: 1, user: 'user1', products: [] }];
      Purchase.find.mockResolvedValue(mockPurchases);

      await purchaseController.getAll(req, res);

      expect(Purchase.find).toHaveBeenCalledWith({ deletedAt: null });
      expect(res.json).toHaveBeenCalledWith(mockPurchases);
    });

    it('debería manejar errores al obtener las órdenes de compra', async () => {
      Purchase.find.mockRejectedValue(new Error('Error en la base de datos'));

      await purchaseController.getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('Orden no encontrada');
    });
  });

  describe('create', () => {
    it('debería crear una nueva orden de compra', async () => {
      const mockPurchase = { id: 1, user: 'user1', products: [] };
      Purchase.create.mockResolvedValue(mockPurchase);
      req.body = {
        user: 'user1',
        products: [{ product: 'product1', quantity: 2 }],
      };

      await purchaseController.create(req, res);

      expect(Purchase.create).toHaveBeenCalledWith({
        user: 'user1',
        products: [{ product: 'product1', quantity: 2 }],
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockPurchase);
    });

    it('debería manejar errores al crear una orden de compra', async () => {
      Purchase.create.mockRejectedValue(new Error('Error al crear'));

      await purchaseController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error en el servidor' });
    });
  });

  describe('getById', () => {
    it('debería retornar una orden de compra por ID', async () => {
      const mockPurchase = { id: 1, user: 'user1', products: [] };
      Purchase.findById.mockResolvedValue(mockPurchase);
      req.params.id = 1;

      await purchaseController.getById(req, res);

      expect(Purchase.findById).toHaveBeenCalledWith(1);
      expect(res.json).toHaveBeenCalledWith(mockPurchase);
    });

    it('debería manejar errores al obtener una orden de compra por ID', async () => {
      Purchase.findById.mockRejectedValue(new Error('Error al buscar'));

      await purchaseController.getById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('Receta no encontrada');
    });
  });

  describe('update', () => {
    it('debería actualizar una orden existente', async () => {
      const mockOrder = { save: jest.fn(), user: 'user1', products: [] };
      Purchase.findById.mockResolvedValue(mockOrder);
      req.params.id = 1;
      req.body = { user: 'user2' };

      await purchaseController.update(req, res);

      expect(Purchase.findById).toHaveBeenCalledWith(1);
      expect(mockOrder.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith('La Orden ha sido actualizada');
    });

    it('debería manejar errores al actualizar una orden inexistente', async () => {
      Purchase.findById.mockResolvedValue(null);
      req.params.id = 1;

      await purchaseController.update(req, res);

      expect(res.json).toHaveBeenCalledWith('No existe una orden con el ID mencionado');
    });
  });

  describe('destroy', () => {
    it('debería eliminar una orden marcándola como eliminada', async () => {
      const mockOrder = { save: jest.fn(), deletedAt: null };
      Purchase.findById.mockResolvedValue(mockOrder);
      req.params.id = 1;

      await purchaseController.destroy(req, res);

      expect(Purchase.findById).toHaveBeenCalledWith(1);
      expect(mockOrder.save).toHaveBeenCalled();
      expect(mockOrder.deletedAt).not.toBeNull();
      expect(res.json).toHaveBeenCalledWith('La orden se ha eliminado');
    });

    it('debería manejar errores al eliminar una orden inexistente', async () => {
      Purchase.findById.mockResolvedValue(null);
      req.params.id = 1;

      await purchaseController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith('No existe una orden con el ID mencionado');
    });

    it('debería manejar errores al eliminar una orden', async () => {
      Purchase.findById.mockRejectedValue(new Error('Error al eliminar'));

      await purchaseController.destroy(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith('Error al eliminar la orden');
    });
  });
});
