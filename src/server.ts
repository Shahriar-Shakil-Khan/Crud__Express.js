import express, { NextFunction, Request, Response } from "express";

import config from "./config";
import initDB, { pool } from "./config/db";

const app = express();
const port = config.port;


app.use(express.json());



initDB().catch((err) => {
  console.error("DB init failed:", err);
  process.exit(1);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Next Level Developers md. shahriar shakil!");
});


// ================= USERS CRUD =================

// Create User
app.post("/users", async (req: Request, res: Response) => {
  const { name, email, age, phone, address, hobby } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO users(name, email, age, phone, address, hobby)
       VALUES($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, email, age, phone, address, hobby]
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Get All Users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
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

