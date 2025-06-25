import { PublicacionesApplicationService } from "../../application/PublicacionesApplicationService";
import { Router } from "express";
import { PublicacionesAdapter } from "../adapter/PublicacionesAdapter";
import { PublicacionesController } from "../controller/PublicacionesController";

const router = Router();

// Inicialización de las capas
const publicacionesAdapter = new PublicacionesAdapter();
const publicacionesAppService = new PublicacionesApplicationService(publicacionesAdapter);
const publicacionesController = new PublicacionesController(publicacionesAppService);

// Definir las rutas con manejo de errores
router.post("/publicaciones", async (req, res) => {
    try {
        await publicacionesController.createPublicacion(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la creación de la publicación" });
    }
});

router.get("/publicaciones", async (req, res) => {
    try {
        await publicacionesController.getAllPublicaciones(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las publicaciones" });
    }
});

router.get("/publicaciones/:id", async (req, res) => {
    try {
        await publicacionesController.getPublicacionById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la publicación" });
    }
});

router.get("/publicaciones/title/:title", async (req, res) => {
    try {
        await publicacionesController.getPublicacionByTitle(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la publicación por título" });
    }
});

router.put("/publicaciones/:id", async (req, res) => {
    try {
        await publicacionesController.updatePublicacion(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la publicación" });
    }
});

router.delete("/publicaciones/:id", async (req, res) => {
    try {
        await publicacionesController.deletePublicacion(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la publicación" });
    }
});

export default router;