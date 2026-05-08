import express, {  Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";

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

// user create
app.use("/users",userRoutes);

// Get User By ID
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE id=$1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get User By ID
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE id=$1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Update User
app.put("/users/:id", async (req: Request, res: Response) => {
  const { name, email, age, phone, address, hobby } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users 
       SET name=$1, email=$2, age=$3, phone=$4, address=$5, hobby=$6
       WHERE id=$7
       RETURNING *`,
      [name, email, age, phone, address, hobby, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Delete User
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `DELETE FROM users WHERE id=$1`,
      [req.params.id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ================= works CRUD =================


app.post("/works", async (req: Request, res: Response) => {
  const { user_id, title, description, completed, due_date, hobby } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO works(user_id, title, description, completed, due_date, hobby)
       VALUES($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, title, description, completed, due_date, hobby]
    );

    res.status(201).json({
      success: true,
      message: "works created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get All Todos
app.get("/works", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM works`);

    res.status(200).json({
      success: true,
      message: "works retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});



// Get works By ID
app.get("/works/:id", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      `SELECT * FROM works WHERE id=$1`,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "works not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "works fetched successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Update Todo
app.put("/works/:id", async (req: Request, res: Response) => {
  const { title, description, completed, due_date, hobby } = req.body;

  try {
    const result = await pool.query(
      `UPDATE works 
       SET title=$1, description=$2, completed=$3, due_date=$4, hobby=$5
       WHERE id=$6
       RETURNING *`,
      [title, description, completed, due_date, hobby, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "works not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "works updated successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

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