import { TipoUserApplicationService } from "../../application/TipoUserApplicationService";
import { Router } from "express";
import { TipoUserAdapter } from "../adapter/TipoUserAdapter";
import { TipoUserController } from "../controller/TipoUserController";


const router = Router();

//Inicializacion de lass capas 

const tipoUserAdapter = new TipoUserAdapter();
const tipoUserAppService = new TipoUserApplicationService(tipoUserAdapter);
const tipoUserController = new TipoUserController(tipoUserAppService);

//definir lass rutas con manejo de errores

router.post("/tipousers", async (req, res) => {
    try {
        await tipoUserController.createTipoUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la creación del tipo de usuario" });
    }
}); 

router.get("/tipousers",async(_req,res)=>{
    try {
        await tipoUserController.getAllTipoUsers(res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los tipos de usuarios" });
    }
});

router.get("/tipousers/:id", async (req, res) => {
    try {
        await tipoUserController.getTipoUserById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el tipo de usuario" });
    }
});

// por si las moscas xd
router.delete("/tipousers/:id", async (req, res) => {
    try {
        await tipoUserController.deleteTipoUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el tipo de usuario" });
    }
});
router.put("/tipousers/:id", async (req, res) => {
    try {
        await tipoUserController.updateTipoUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el tipo de usuario" });
    }
});

export default router;