import express, { Request, Response } from "express"
import { workControllers } from "./work.controller";
const router = express.Router();

router.post("/", workControllers.createWork );

router.get("/", workControllers.getWork );

router.get("/:id", workControllers.getSingleWork );

router.put("/:id", workControllers.updateWork );

export const workRoutes = router;