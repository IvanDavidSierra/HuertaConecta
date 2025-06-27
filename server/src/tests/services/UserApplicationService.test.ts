import { UserApplicationService } from '../../application/UserApplicationService';
import { User } from '../../domain/usuarios';
import { TipoUser } from '../../domain/tipos_usuarios';
import { UserPort } from '../../domain/usuarios_port';

// Mock del puerto
const mockUserPort: jest.Mocked<UserPort> = {
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  getUserByEmail: jest.fn()
};

describe('UserApplicationService', () => {
  let userService: UserApplicationService;
  let mockPort: jest.Mocked<UserPort>;

  beforeEach(() => {
    mockPort = { ...mockUserPort };
    userService = new UserApplicationService(mockPort);
    jest.clearAllMocks();
  });

  describe('createUser', () => {
    it('debería crear un usuario exitosamente cuando el email no existe', async () => {
      // Arrange
      const tipoUsuario: TipoUser = {
        id_tipo_usuario: 1,
        descripcion_tipo_usuario: 'Agricultor'
      };

      const newUser: Omit<User, 'id_usuario'> = {
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan.perez@email.com',
        contrasena: 'password123',
        id_tipo_usuario: tipoUsuario,
        fecha_creacion: new Date()
      };

      mockPort.getUserByEmail.mockResolvedValue(null);
      mockPort.createUser.mockResolvedValue(1);

      // Act
      const result = await userService.createUser(newUser);

      // Assert
      expect(mockPort.getUserByEmail).toHaveBeenCalledWith('juan.perez@email.com');
      expect(mockPort.createUser).toHaveBeenCalledWith(newUser);
      expect(result).toBe(1);
    });

    it('debería lanzar error cuando el email ya existe', async () => {
      // Arrange
      const tipoUsuario: TipoUser = {
        id_tipo_usuario: 1,
        descripcion_tipo_usuario: 'Agricultor'
      };

      const existingUser: User = {
        id_usuario: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan.perez@email.com',
        contrasena: 'password123',
        id_tipo_usuario: tipoUsuario,
        fecha_creacion: new Date()
      };

      const newUser: Omit<User, 'id_usuario'> = {
        nombre: 'María',
        apellido: 'García',
        correo: 'juan.perez@email.com',
        contrasena: 'password456',
        id_tipo_usuario: tipoUsuario,
        fecha_creacion: new Date()
      };

      mockPort.getUserByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(userService.createUser(newUser)).rejects.toThrow('Email existente');
      expect(mockPort.getUserByEmail).toHaveBeenCalledWith('juan.perez@email.com');
      expect(mockPort.createUser).not.toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    it('debería retornar un usuario cuando existe', async () => {
      // Arrange
      const tipoUsuario: TipoUser = {
        id_tipo_usuario: 1,
        descripcion_tipo_usuario: 'Agricultor'
      };

      const expectedUser: User = {
        id_usuario: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan.perez@email.com',
        contrasena: 'password123',
        id_tipo_usuario: tipoUsuario,
        fecha_creacion: new Date()
      };

      mockPort.getUserById.mockResolvedValue(expectedUser);

      // Act
      const result = await userService.getUserById(1);

      // Assert
      expect(mockPort.getUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedUser);
    });

    it('debería retornar null cuando el usuario no existe', async () => {
      // Arrange
      mockPort.getUserById.mockResolvedValue(null);

      // Act
      const result = await userService.getUserById(999);

      // Assert
      expect(mockPort.getUserById).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });
}); 