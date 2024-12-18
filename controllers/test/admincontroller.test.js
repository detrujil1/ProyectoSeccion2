import adminController from '../../controllers/admincontroller.js';
import Admin from '../../models/admin.js';
import { CreateToken } from '../../middleware/createToken.js';
import bcrypt from 'bcryptjs';

jest.mock('../../models/admin.js');
jest.mock('../../middleware/createToken.js', () => ({
  CreateToken: jest.fn(() => 'mocked-token'),
}));
jest.mock('bcryptjs');

describe('Admin Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it('debería retornar un token si las credenciales son correctas', async () => {
    req.body = { email: 'admin@example.com', password: '123456' };

    const mockAdmin = {
      email: 'admin@example.com',
      password: 'hashedpassword',
      toObject: jest.fn().mockReturnValue({ email: 'admin@example.com', password: 'hashedpassword' }),
    };

    Admin.findOne.mockResolvedValue(mockAdmin);
    bcrypt.compare.mockResolvedValue(true);

    await adminController.login(req, res);

    expect(Admin.findOne).toHaveBeenCalledWith({ email: 'admin@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashedpassword');
    expect(CreateToken).toHaveBeenCalledWith({ email: 'admin@example.com' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('mocked-token');
  });

  it('debería retornar un error si la contraseña es incorrecta', async () => {
    req.body = { email: 'admin@example.com', password: 'wrongPassword' };

    const mockAdmin = { password: 'hashedPassword' };
    Admin.findOne.mockResolvedValue(mockAdmin);
    bcrypt.compare.mockResolvedValue(false);

    await adminController.login(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith('contraseña incorrecta');
  });

  it('debería manejar errores inesperados en el login', async () => {
    Admin.findOne.mockRejectedValue(new Error('Error inesperado'));

    await adminController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('administrador no encontrado');
  });

  it('debería retornar todos los administradores', async () => {
    const mockAdmins = [{ id: 1, name: 'Admin Doe' }];
    Admin.find.mockResolvedValue(mockAdmins);

    await adminController.getAll(req, res);

    expect(Admin.find).toHaveBeenCalledWith({ deletedAt: null });
    expect(res.json).toHaveBeenCalledWith(mockAdmins);
  });

  it('debería manejar errores al obtener todos los administradores', async () => {
    Admin.find.mockRejectedValue(new Error('Error al buscar'));

    await adminController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('admins no encontrados ');
  });

  it('debería crear un nuevo administrador', async () => {
    const mockAdmin = { id: 1, name: 'Admin Doe' };
    Admin.create.mockResolvedValue(mockAdmin);
    req.body = {
      document: '12345678',
      name: 'Admin',
      lastName: 'Doe',
      email: 'admin@example.com',
      password: '123456',
    };

    await adminController.create(req, res);

    expect(Admin.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockAdmin);
  });

  it('debería manejar errores al crear un administrador', async () => {
    Admin.create.mockRejectedValue(new Error('Error al crear'));

    await adminController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error en el servidor' });
  });

  it('debería actualizar un administrador existente', async () => {
    const mockAdmin = {
      save: jest.fn(),
      document: '123456',
      name: 'Admin',
      lastName: 'Doe',
      email: 'admin@example.com',
      password: 'oldpassword',
    };

    Admin.findById.mockResolvedValue(mockAdmin);
    req.params.id = 1;
    req.body = { name: 'Updated Admin', password: 'newpassword' };

    await adminController.update(req, res);

    expect(Admin.findById).toHaveBeenCalledWith(1);
    expect(mockAdmin.name).toBe('Updated Admin');
    expect(mockAdmin.password).toBe('newpassword');
    expect(mockAdmin.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith('El administrador ha sido actualizada');
  });

  it('debería manejar errores al actualizar un administrador inexistente', async () => {
    Admin.findById.mockResolvedValue(null);
    req.params.id = 1;

    await adminController.update(req, res);

    expect(res.json).toHaveBeenCalledWith('No existe el administrador con el ID mencionado');
  });

  it('debería retornar un administrador por ID', async () => {
    const mockAdmin = { id: 1, name: 'Admin Doe' };
    Admin.findById.mockResolvedValue(mockAdmin);
    req.params.id = 1;

    await adminController.getById(req, res);

    expect(Admin.findById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(mockAdmin);
  });

  it('debería manejar errores al obtener un administrador por ID', async () => {
    Admin.findById.mockRejectedValue(new Error('Error al buscar'));

    await adminController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('admin no encontrada');
  });

  it('debería eliminar un administrador marcándolo como eliminado', async () => {
    const mockAdmin = { save: jest.fn(), deletedAt: null };
    Admin.findById.mockResolvedValue(mockAdmin);
    req.params.id = 1;

    await adminController.deleteAdmin(req, res);

    expect(Admin.findById).toHaveBeenCalledWith(1);
    expect(mockAdmin.save).toHaveBeenCalled();
    expect(mockAdmin.deletedAt).not.toBeNull();
    expect(res.json).toHaveBeenCalledWith('El administrador se ha eliminado');
  });


});
