import {Request, Response} from 'express'
import OracleDB from 'oracledb';
import { connection } from '../oracle'


export async function getCategories(req:Request, res:Response) {
    let query = `SELECT nombre_categoria FROM CATEGORIA ORDER BY nombre_categoria ASC`;
    let result:OracleDB.Result<any> = await connection.execute(query);
    try {
        if (result.rows){
            res.send(result.rows);
        } else {
            res.send(null);
        }
    } catch (err) {
        res.send(null);
    }
}


export async function insertProduct(req:Request, res:Response) {
    let nombre_producto = req.body.name;
    let precio_producto = req.body.price;
    let categoria = req.body.category;
    let detalle_producto = req.body.detail;
    let query = `INSERT INTO PRODUCTO(nombre_producto,precio_producto,categoria,detalle_producto) VALUES('${nombre_producto}','${precio_producto}','${categoria}','${detalle_producto}')`;
    console.log(query);
    let result:OracleDB.Result<any> = await connection.execute(query, [], {autoCommit:true});
    try {
        if (result.rows){
            res.send(result.rows);
        } else {
            res.send(null);
        }
    } catch (err) {
        res.send(null);
    }
}