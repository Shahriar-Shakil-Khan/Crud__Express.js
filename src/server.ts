import express, {  Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { workRoutes } from "./modules/works/work.routes";
import { authRoutes } from "./modules/auth/auth.routes";

const app = express();
const port = config.port;


app.use(express.json());


initDB().catch((err) => {
  console.error("DB init failed:", err);
  process.exit(1);
});

app.get("/",logger, (req: Request, res: Response) => {
  res.send("Hello Next Level Developers md. shahriar shakil!");
});


// ================= USERS CRUD =================

app.use("/users",userRoutes);

// ================= works CRUD =================

app.use("/works", workRoutes);

//================== Auth Routes =================

app.use("/auth", authRoutes);





// ================= 404 =================
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});


// ================= SERVER =================
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});