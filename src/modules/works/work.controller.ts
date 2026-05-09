import { Request, Response } from "express";
import { pool } from "../../config/db";
import { workServices } from "./work.service";

const createWork = async (req: Request, res: Response) => {
  const { user_id, title, description, completed, due_date, hobby } = req.body;

  try {
    const result = await workServices.workCreate(user_id, title, description, completed, due_date, hobby)

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
}

const getWork = async (req: Request, res: Response) => {
  try {
    const result = await workServices.getWork()

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
}

const getSingleWork = async (req: Request, res: Response) => {
  try {
    const result = await workServices.getSingleWork(req.params.id as string)

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
}

const updateWork = async (req: Request, res: Response) => {
  
  const { title, description, completed, due_date, hobby } = req.body;

  try {
    const result = await workServices.updateWork(title, description, completed, due_date, hobby, req.params.id as string)

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
}

export const workControllers ={
    createWork,
    getWork,
    getSingleWork,
    updateWork,
}