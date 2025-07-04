import {UserApplicationService} from "../../application/UserApplicationService";
import { User } from "../../domain/usuarios";
import { Request, Response} from "express";
export class UserController{
    private app: UserApplicationService;
    constructor(app:UserApplicationService){
        this.app = app;
    }
    async createUser(req: Request, res: Response) {
    try {
      const { nombre, correo, contrasena, apellido, id_tipo_usuario, fecha_creacion } = req.body;
 
      // Validaciones con expresiones regulares
      if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)?$/.test(nombre.trim()))
        return res
          .status(400)
          .json({
            error:
              "El nombre debe tener al menos 3 caracteres y solo contener letras",
          });
 
      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(correo))
        return res.status(400).json({ error: "Correo electrónico no válido" });
 
      if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(contrasena))
        return res
          .status(400)
          .json({
            error:
              "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número",
          });
 

 
      // Crear usuario
      const user: Omit<User, "id"> = {
        nombre, correo, contrasena, apellido, id_tipo_usuario, fecha_creacion,
        id_usuario: 0
      };
      const userId = await this.app.createUser(user);
 
      return res
        .status(201)
        .json({ message: "Usuario creado con éxito", userId });
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({
            error: "Error interno del servidor",
            details: error.message,
          });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  async getUserById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID de usuario no válido" });
      }
 
      const user = await this.app.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
 
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({
            error: "Error interno del servidor",
            details: error.message,
          });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
  async getUserByEmail(req: Request, res: Response) {
    try {
      const {email} = req.params;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: "Correo electrónico no válido" });
      }
 
      const user = await this.app.getUserByEmail(email);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
 
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({
            error: "Error interno del servidor",
            details: error.message,
          });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async getAllUsers(res: Response) {
    try {
      const users = await this.app.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "ID de usuario no válido" });
      }
 
      const deleted = await this.app.deleteUser(id);
      if (!deleted) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
 
      return res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id_usuario, nombre, correo, contrasena, apellido, id_tipo_usuario, fecha_creacion } = req.body;
      
      if (!id_usuario || isNaN(parseInt(id_usuario))) {
        return res.status(400).json({ error: "ID de usuario no válido" });
      }

      // Validaciones con expresiones regulares
      if (nombre && !/^[a-zA-Z\s]{3,}$/.test(nombre.trim()))
        return res
          .status(400)
          .json({
            error:
              "El nombre debe tener al menos 3 caracteres y solo contener letras",
          });
 
      if (correo && !/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(correo))
        return res.status(400).json({ error: "Correo electrónico no válido" });
 
      if (contrasena && !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(contrasena))
        return res
          .status(400)
          .json({
            error:
              "La contraseña debe tener al menos 6 caracteres, incluyendo al menos una letra y un número",
          });

      const updated = await this.app.updateUser(parseInt(id_usuario), {
        nombre, 
        correo,
        contrasena,
        apellido,
        id_tipo_usuario,
        fecha_creacion
      });
      if (!updated) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      return res.status(200).json({ message: "Usuario actualizado con éxito" });
    } catch (error) {   
      if (error instanceof Error) {
        return res
          .status(500)
          .json({
            error: "Error interno del servidor",
            details: error.message,
          });
      }
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}
