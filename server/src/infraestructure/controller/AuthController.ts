import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserAdapter } from '../adapter/UserAdapter';
import { UserApplicationService } from '../../application/UserApplicationService';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecreto';

export class AuthController {
  private userService: UserApplicationService;

  constructor() {
    const userAdapter = new UserAdapter();
    this.userService = new UserApplicationService(userAdapter);
  }

  async register(req: Request, res: Response) {
    try {
      const { nombre, apellido, correo, contrasena, id_tipo_usuario } = req.body;
      if (!nombre || !apellido || !correo || !contrasena || !id_tipo_usuario) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      // Verificar si el usuario ya existe
      const existingUser = await this.userService.getUserByEmail(correo);
      if (existingUser) {
        return res.status(409).json({ message: 'El correo ya está registrado' });
      }

      // Hashear la contraseña
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(contrasena, salt);

      // Crear el usuario
      const newUserId = await this.userService.createUser({
        nombre,
        apellido,
        correo,
        contrasena: hashedPassword,
        id_tipo_usuario,
        fecha_creacion: new Date()
      });

      // Obtener el usuario recién creado para generar el token
      const newUser = await this.userService.getUserById(newUserId);
      if(!newUser){
        return res.status(500).json({ message: 'Error al recuperar el usuario después del registro' });
      }

      // Generar JWT
      const token = jwt.sign(
        { id_usuario: newUser.id_usuario, correo: newUser.correo },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return res.status(201).json({
        message: 'Usuario registrado correctamente',
        user: {
          id_usuario: newUser.id_usuario,
          nombre: newUser.nombre,
          apellido: newUser.apellido,
          correo: newUser.correo,
          id_tipo_usuario: newUser.id_tipo_usuario
        },
        token
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el registro' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { correo, contrasena } = req.body;
      if (!correo || !contrasena) {
        return res.status(400).json({ message: 'El correo y la contraseña son obligatorios' });
      }

      // Buscar al usuario por su correo
      const user = await this.userService.getUserByEmail(correo);
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' }); // Mensaje genérico por seguridad
      }

      // Comparar la contraseña enviada con la hasheada
      const isPasswordMatch = await bcrypt.compare(contrasena, user.contrasena);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }

      // Generar JWT
      const token = jwt.sign(
        { id_usuario: user.id_usuario, correo: user.correo },
        JWT_SECRET,
        { expiresIn: '7d' } // Puedes ajustar la expiración del token
      );
      
      // Omitir la contraseña en la respuesta
      const { contrasena: _, ...userWithoutPassword } = user;

      return res.status(200).json({
        message: 'Inicio de sesión exitoso',
        user: userWithoutPassword,
        token
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error en el inicio de sesión' });
    }
  }
} 