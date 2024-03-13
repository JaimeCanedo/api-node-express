import { pool } from "../database/connection.js";

const findAll = async () => {
    const { rows } = await pool.query("SELECT * FROM public.departamento ORDER BY id_departamento ASC");
    return rows;
};


// Función para buscar un Departmento por su ID
const getDepartmentById = async (id) => {
    try {
        const query = 'SELECT * FROM public.departamento WHERE id_departamento = $1';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
     } catch (error){
        throw error;
     } 
};

const createDepartment = async (nombre) => {
    try {
        const query = 'INSERT INTO public.departamento (nombre) VALUES ($1) RETURNING *';
        const values = [nombre];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateDepartment = async (id, nombre) => {
    try {
        const query = 'UPDATE public.departamento SET nombre = $1 WHERE id_departamento = $2 RETURNING *';
        const values = [nombre, id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteDepartment = async (id) => {
    try {
        const query = 'DELETE FROM public.departamento WHERE id_departamento = $1 RETURNING *';
        const values = [id];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};


export const DepartmentsModel = {
    findAll, 
    getDepartmentById,
    createDepartment, 
    updateDepartment,
    deleteDepartment,
};