import { pool } from "../../config/db";

const createUser = async (name: string, email : string, age :number, phone: string, address: string, hobby: string)=>{
    const result = await pool.query(
        `INSERT INTO users(name, email, age, phone, address, hobby)
        VALUES($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [name, email, age, phone, address, hobby]
        );

        return result;
}

export const userServices ={
    createUser,
}