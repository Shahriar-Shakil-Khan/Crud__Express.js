import { pool } from "../../config/db"

const workCreate = async(user_id:number, title:string, description:string, completed:boolean, due_date:string, hobby:string)=>{
    const result = await pool.query(
          `INSERT INTO works(user_id, title, description, completed, due_date, hobby)
           VALUES($1, $2, $3, $4, $5, $6)
           RETURNING *`,
          [user_id, title, description, completed, due_date, hobby]
        );
        return result;

}

const getWork =async()=>{
    const result = await pool.query(`SELECT * FROM works`);
    return result;
}


const getSingleWork =async(id:string)=>{
    const result = await pool.query(
      `SELECT * FROM works WHERE id=$1`,
      [id]
    );
     return result;
}

const updateWork = async(title:string, description:string, completed:boolean, due_date:string, hobby:string, id:string)=>{
    
    const result = await pool.query(
      `UPDATE works 
       SET title=$1, description=$2, completed=$3, due_date=$4, hobby=$5
       WHERE id=$6
       RETURNING *`,
      [title, description, completed, due_date, hobby, id]
    );
    return result;
}

export const workServices = {
    workCreate,
    getWork,
    getSingleWork,
    updateWork
}