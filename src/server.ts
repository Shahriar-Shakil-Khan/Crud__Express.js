import express, {  Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { workRoutes } from "./modules/works/work.routes";

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


// Update Todo


// Delete Todo
app.delete("/works/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `DELETE FROM works WHERE id=$1`,
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "works not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "works deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


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