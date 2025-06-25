import { UsuariosHuertasApplicationService } from "../../application/UsuariosHuertasApplicationService";
import { Router } from "express";
import { UsuariosHuertasAdapter } from "../adapter/UsuariosHuertasAdapter";
import { UsuariosHuertasController } from "../controller/UsuariosHuertasController";

const router = Router();

// Inicialización de las capas
const usuariosHuertasAdapter = new UsuariosHuertasAdapter();
const usuariosHuertasAppService = new UsuariosHuertasApplicationService(usuariosHuertasAdapter);
const usuariosHuertasController = new UsuariosHuertasController(usuariosHuertasAppService);

// Definir las rutas con manejo de errores
router.post("/usuarios-huertas", async (req, res) => {
    try {
        await usuariosHuertasController.createUsuariosHuertas(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la creación de la vinculación usuario-huerta" });
    }
});

router.get("/usuarios-huertas", async (req, res) => {
    try {
        await usuariosHuertasController.getAllUsuariosHuertas(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las vinculaciones usuario-huerta" });
    }
});

router.get("/usuarios-huertas/:id", async (req, res) => {
    try {
        await usuariosHuertasController.getUsuariosHuertasById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la vinculación usuario-huerta" });
    }
});

router.put("/usuarios-huertas/:id", async (req, res) => {
    try {
        await usuariosHuertasController.updateUsuariosHuertas(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la vinculación usuario-huerta" });
    }
});

router.delete("/usuarios-huertas/:id", async (req, res) => {
    try {
        await usuariosHuertasController.deleteUsuariosHuertas(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la vinculación usuario-huerta" });
    }
});

router.get("/usuarios-huertas/user/:userId", async (req, res) => {
    try {
        await usuariosHuertasController.getUsuariosHuertasByUserId(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las vinculaciones por usuario" });
    }
});

router.get("/usuarios-huertas/huerta/:huertaId", async (req, res) => {
    try {
        await usuariosHuertasController.getUsuariosHuertasByHuertaId(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las vinculaciones por huerta" });
    }
});

export default router; 