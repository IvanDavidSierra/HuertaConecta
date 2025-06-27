import { User } from '../../domain/usuarios';
import { TipoUser } from '../../domain/tipos_usuarios';

describe('User Domain', () => {
  describe('User Interface', () => {
    it('debería crear un usuario válido con todas las propiedades requeridas', () => {
      // Arrange
      const tipoUsuario: TipoUser = {
        id_tipo_usuario: 1,
        descripcion_tipo_usuario: 'Usuario que cultiva en huertas'
      };

      const fechaCreacion = new Date('2024-01-01');

      // Act
      const usuario: User = {
        id_usuario: 1,
        nombre: 'Juan',
        apellido: 'Pérez',
        correo: 'juan.perez@email.com',
        contrasena: 'password123',
        id_tipo_usuario: tipoUsuario,
        fecha_creacion: fechaCreacion
      };

      // Assert
      expect(usuario.id_usuario).toBe(1);
      expect(usuario.nombre).toBe('Juan');
      expect(usuario.apellido).toBe('Pérez');
      expect(usuario.correo).toBe('juan.perez@email.com');
      expect(usuario.contrasena).toBe('password123');
      expect(usuario.id_tipo_usuario).toEqual(tipoUsuario);
      expect(usuario.fecha_creacion).toEqual(fechaCreacion);
    });

    it('debería validar que el correo electrónico tenga formato válido', () => {
      // Arrange
      const tipoUsuario: TipoUser = {
        id_tipo_usuario: 1,
        descripcion_tipo_usuario: 'Usuario que cultiva en huertas'
      };

      const usuario: User = {
        id_usuario: 1,
        nombre: 'María',
        apellido: 'García',
        correo: 'maria.garcia@email.com',
        contrasena: 'password123',
        id_tipo_usuario: tipoUsuario,
        fecha_creacion: new Date()
      };

      // Act & Assert
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(usuario.correo)).toBe(true);
    });

    it('debería validar que el nombre y apellido no estén vacíos', () => {
      // Arrange
      const tipoUsuario: TipoUser = {
        id_tipo_usuario: 1,
        descripcion_tipo_usuario: 'Usuario que cultiva en huertas'
      };

      const usuario: User = {
        id_usuario: 1,
        nombre: 'Ana',
        apellido: 'López',
        correo: 'ana.lopez@email.com',
        contrasena: 'password123',
        id_tipo_usuario: tipoUsuario,
        fecha_creacion: new Date()
      };

      // Act & Assert
      expect(usuario.nombre.trim().length).toBeGreaterThan(0);
      expect(usuario.apellido.trim().length).toBeGreaterThan(0);
    });
  });
}); 