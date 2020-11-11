import { Request, Response } from 'express'
import OracleDB from 'oracledb';
import { connection } from '../oracle'


export async function newProductRequest(req: Request, res: Response) {
    let email = req.body.email;
    let id_product = req.body.id_product;
    let date = req.body.date;
    let query = `INSERT INTO SOLICITUD(cliente,producto,cantidad,fecha_solicitud,ejecutada) VALUES('${email}',${id_product},1,TO_DATE('${date}', 'MON DD, YYYY, HH:MI:SS AM'),0)`;
    try {
        let result: OracleDB.Result<any> = await connection.execute(query, [], { autoCommit: true });
        if (result.rowsAffected) {
            res.json({ message: "Insertado correctamente" });
        } else {
            res.json({ message: "No se pudo insertar" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

export async function getCart(req: Request, res: Response) {
    console.log(req.params)
    let email = req.params.email;
    let query = `SELECT soli.id_solicitud, soli.producto, prod.nombre_producto, prod.precio_producto, soli.cantidad, prod.usuario, soli.ejecutada FROM SOLICITUD soli JOIN PRODUCTO prod ON soli.producto = prod.id_producto WHERE soli.cliente = '${email}' ORDER BY soli.fecha_solicitud DESC`;
    try {
        let result: OracleDB.Result<any> = await connection.execute(query);
        if (result.rows) {
            let response = [];
            for (let index = 0; index < result.rows.length; index++) {
                const element = result.rows[index];
                response.push({
                    id: element[0],
                    product: element[1],
                    name: element[2],
                    price: element[3],
                    quantity: element[4],
                    seller: element[5],
                    confirmed: element[6]
                });
            }
            res.json(response);
        } else {
            res.send(null);
        }
    } catch (err) {
        res.send(null);
    }
}

export async function confirmRequest(req: Request, res: Response) {
    let binds = req.body.array;
    let query = `UPDATE SOLICITUD SET cantidad=:quantity, ejecutada=1 WHERE id_solicitud=:id`;

    try {
        let result: OracleDB.Result<any> = await connection.executeMany(query, binds, { autoCommit: true });
        if (result.rowsAffected) {
            res.json({ message: "Actualizados correctamente" });
        } else {
            res.json({ message: "No se actualizó" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

export async function cleanCart(req: Request, res: Response) {
    let email = req.body.email;
    let query = `DELETE FROM SOLICITUD WHERE cliente='${email}'`;
    try {
        let result: OracleDB.Result<any> = await connection.execute(query, [], { autoCommit: true });
        if (result.rowsAffected) {
            res.json({ message: "Eliminados correctamente" });
        } else {
            res.json({ message: "No se eliminó" })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

