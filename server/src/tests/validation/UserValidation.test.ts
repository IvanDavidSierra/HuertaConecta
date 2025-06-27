import { User } from '../../domain/usuarios';
import { TipoUser } from '../../domain/tipos_usuarios';

// Funciones de validación
export class UserValidation {
  static validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  static validatePassword(password: string): boolean {
    // Contraseña debe tener al menos 8 caracteres
    return password.length >= 8;
  }

  static validateName(name: string): boolean {
    // Nombre debe tener al menos 2 caracteres y solo letras
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,}$/;
    return nameRegex.test(name.trim());
  }

  static validateUser(user: Omit<User, 'id_usuario'>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.validateName(user.nombre)) {
      errors.push('El nombre debe tener al menos 2 caracteres y solo contener letras');
    }

    if (!this.validateName(user.apellido)) {
      errors.push('El apellido debe tener al menos 2 caracteres y solo contener letras');
    }

    if (!this.validateEmail(user.correo)) {
      errors.push('El correo electrónico no tiene un formato válido');
    }

    if (!this.validatePassword(user.contrasena)) {
      errors.push('La contraseña debe tener al menos 8 caracteres');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

describe('UserValidation', () => {
  describe('validateEmail', () => {
    it('debería validar emails correctos', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        '123@numbers.com'
      ];

      validEmails.forEach(email => {
        expect(UserValidation.validateEmail(email)).toBe(true);
      });
    });

    it('debería rechazar emails incorrectos', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user@.com',
        'user..name@example.com',
        'user@example',
        'user@.com'
      ];

      invalidEmails.forEach(email => {
        expect(UserValidation.validateEmail(email)).toBe(false);
      });
    });
  });

  describe('validatePassword', () => {
    it('debería validar contraseñas con 8 o más caracteres', () => {
      const validPasswords = [
        'password123',
        '12345678',
        'MySecurePassword!',
        'abcdefgh'
      ];

      validPasswords.forEach(password => {
        expect(UserValidation.validatePassword(password)).toBe(true);
      });
    });

    it('debería rechazar contraseñas con menos de 8 caracteres', () => {
      const invalidPasswords = [
        '123',
        'pass',
        'abc',
        '1234567'
      ];

      invalidPasswords.forEach(password => {
        expect(UserValidation.validatePassword(password)).toBe(false);
      });
    });
  });

  describe('validateName', () => {
    it('debería validar nombres correctos', () => {
      const validNames = [
        'Juan',
        'María José',
        'José Luis',
        'Ana María',
        'Carlos'
      ];

      validNames.forEach(name => {
        expect(UserValidation.validateName(name)).toBe(true);
      });
    });

    it('debería rechazar nombres incorrectos', () => {
      const invalidNames = [
        'A', // Muy corto
        '123', // Números
        'Juan123', // Números mezclados
        '', // Vacío
        '   ', // Solo espacios
        'J@uan' // Caracteres especiales
      ];

      invalidNames.forEach(name => {
        expect(UserValidation.validateName(name)).toBe(false);
      });
    });
  });

  describe('validateUser', () => {
    it('debería validar un usuario completamente válido', () => {
      // Arrange
      const tipoUsuario: TipoUser = {
        id_tipo_usuario: 1,
        descripcion_tipo_usuario: 'Agricultor'
      };

      const validUser: Omit<User, 'id_usuario'> = {
        nombre: 'Juan Carlos',
        apellido: 'Pérez García',
        correo: 'juan.perez@email.com',
        contrasena: 'password123',
        id_tipo_usuario: tipoUsuario,
        fecha_creacion: new Date()
      };

      // Act
      const result = UserValidation.validateUser(validUser);

      // Assert
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('debería detectar múltiples errores en un usuario inválido', () => {
      // Arrange
      const tipoUsuario: TipoUser = {
        id_tipo_usuario: 1,
        descripcion_tipo_usuario: 'Agricultor'
      };

      const invalidUser: Omit<User, 'id_usuario'> = {
        nombre: 'A', // Muy corto
        apellido: '123', // Números
        correo: 'invalid-email', // Email inválido
        contrasena: '123', // Muy corta
        id_tipo_usuario: tipoUsuario,
        fecha_creacion: new Date()
      };

      // Act
      const result = UserValidation.validateUser(invalidUser);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.errors).toHaveLength(4);
      expect(result.errors).toContain('El nombre debe tener al menos 2 caracteres y solo contener letras');
      expect(result.errors).toContain('El apellido debe tener al menos 2 caracteres y solo contener letras');
      expect(result.errors).toContain('El correo electrónico no tiene un formato válido');
      expect(result.errors).toContain('La contraseña debe tener al menos 8 caracteres');
    });
  });
}); 