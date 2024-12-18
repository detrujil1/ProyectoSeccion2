// Test para UserController
import userController from '../../controllers/UserController.js';
import User from '../../models/user.js';
import { CreateToken } from '../../middleware/createToken.js';
import bcrypt from 'bcryptjs';

jest.mock('../../models/user.js');
jest.mock('../../middleware/createToken.js', () => ({
  CreateToken: jest.fn(() => 'mocked-token'),
}));
jest.mock('bcryptjs');

describe('User Controller', () => {
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
    req.body = { email: 'test@example.com', password: '123456' };

    const mockUser = {
      email: 'test@example.com',
      password: 'hashedpassword',
      toObject: jest.fn().mockReturnValue({ email: 'test@example.com', password: 'hashedpassword' }),
    };

    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);

    await userController.login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashedpassword');
    expect(CreateToken).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith('mocked-token');
  });

  it('debería retornar un error si el usuario no existe', async () => {
    req.body = { email: 'notfound@example.com', password: '123456' };
    User.findOne.mockResolvedValue(null);

    await userController.login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'notfound@example.com' });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith('usuario no registrado');
  });

  it('debería retornar un error si la contraseña es incorrecta', async () => {
    req.body = { email: 'test@example.com', password: 'wrongPassword' };

    const mockUser = { password: 'hashedPassword' };
    User.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await userController.login(req, res);

    expect(bcrypt.compare).toHaveBeenCalledWith('wrongPassword', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith('contraseña incorrecta');
  });

  it('debería manejar errores inesperados en el login', async () => {
    User.findOne.mockRejectedValue(new Error('Error inesperado'));

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('usuarios no resgitrado');
  });

  it('debería retornar todos los usuarios', async () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];
    User.find.mockResolvedValue(mockUsers);

    await userController.getAll(req, res);

    expect(User.find).toHaveBeenCalledWith({ deletedAt: null });
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  it('debería manejar errores al obtener todos los usuarios', async () => {
    User.find.mockRejectedValue(new Error('Error al buscar'));

    await userController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('usuarios no encontrados ');
  });

  it('debería retornar un usuario por ID', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    User.findById.mockResolvedValue(mockUser);
    req.params.id = 1;

    await userController.getById(req, res);

    expect(User.findById).toHaveBeenCalledWith(1);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('debería manejar errores al obtener un usuario por ID', async () => {
    User.findById.mockRejectedValue(new Error('Error al buscar'));

    await userController.getById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith('user no encontrada');
  });

  it('debería crear un nuevo usuario', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    User.create.mockResolvedValue(mockUser);
    req.body = {
      id: 1,
      name: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '123456',
    };

    await userController.create(req, res);

    expect(User.create).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('debería manejar errores al crear un usuario', async () => {
    User.create.mockRejectedValue(new Error('Error al crear'));

    await userController.create(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error en el servidor' });
  });

  it('debería actualizar un usuario existente', async () => {
    const mockUser = { save: jest.fn(), name: 'John' };
    User.findById.mockResolvedValue(mockUser);
    req.params.id = 1;
    req.body = { name: 'Johnny' };

    await userController.update(req, res);

    expect(User.findById).toHaveBeenCalledWith(1);
    expect(mockUser.save).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith('El usuario ha sido actualizada');
  });

  it('debería manejar errores al actualizar un usuario inexistente', async () => {
    User.findById.mockResolvedValue(null);
    req.params.id = 1;

    await userController.update(req, res);

    expect(res.json).toHaveBeenCalledWith('No existe el usuario con el ID mencionado');
  });

  it('debería eliminar un usuario marcándolo como eliminado', async () => {
    const mockUser = { save: jest.fn(), deletedAt: null };
    User.findById.mockResolvedValue(mockUser);
    req.params.id = 1;

    await userController.deleteUser(req, res);

    expect(User.findById).toHaveBeenCalledWith(1);
    expect(mockUser.save).toHaveBeenCalled();
    expect(mockUser.deletedAt).not.toBeNull();
    expect(res.json).toHaveBeenCalledWith('El usuario se ha eliminado');
  });
});
