import { Request, Response } from 'express'
import OracleDB from 'oracledb';
import { connection } from '../oracle'


export async function getCategories(req: Request, res: Response) {
    let query = `SELECT nombre_categoria FROM CATEGORIA ORDER BY nombre_categoria ASC`;
    let result: OracleDB.Result<any> = await connection.execute(query);
    try {
        if (result.rows) {
            res.send(result.rows);
        } else {
            res.send(null);
        }
    } catch (err) {
        res.send(null);
    }
}

export async function getProducts(req: Request, res: Response) {
    let query = `SELECT * FROM PRODUCTO ORDER BY fecha_publicacion DESC`;
    let result: OracleDB.Result<any> = await connection.execute(query);
    try {
        if (result.rows) {
            /*let response = [];
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[0];
                let product = {
                    id_product:row[0],
                    name:row[1],
                    price:row[2],
                    category:row[3],
                    detail:row[4],
                    user:row[5],
                    imgFile:row[6],
                    date:row[7],
                    visible:row[8]
                }
                response.push(product);
            }*/
            res.json(result.rows);
        } else {
            res.send(null);
        }
    } catch (err) {
        res.send(null);
    }
}

export async function insertProduct(req: Request, res: Response) {
    let nombre_producto = req.body.name;
    let precio_producto = req.body.price;
    let categoria = req.body.category;
    let detalle_producto = req.body.detail;
    let usuario = req.body.user;
    let imagen = req.body.image;
    let fecha_publicacion = req.body.postDate;
    let query = `INSERT INTO PRODUCTO(nombre_producto,precio_producto,categoria,detalle_producto,usuario,imagen,fecha_publicacion,es_visible) VALUES('${nombre_producto}',${precio_producto},'${categoria}','${detalle_producto}','${usuario}','${imagen}',TO_DATE('${fecha_publicacion}', 'MONTH DD, YYYY'),1)`;
    console.log(query);
    let result: OracleDB.Result<any> = await connection.execute(query, [], { autoCommit: true });
    try {
        if (result.rowsAffected) {
            console.log(result);
            res.send(result.rows);
        } else {
            res.send(null);
        }
    } catch (err) {
        res.send(null);
    }
}

export async function insertProduct2(req: Request, res: Response) {
    let nombre_producto = req.body.name;
    let precio_producto = req.body.price;
    let categoria = req.body.category;
    let detalle_producto = req.body.detail;
    let usuario = req.body.user;
    let imagen = req.body.image;
    let fecha_publicacion = req.body.postDate;
    let query = `
    DECLARE
        id_prod INT;
    BEGIN
        :id_prod := inserta_producto('${nombre_producto}',${precio_producto},'${categoria}','${detalle_producto}','${usuario}','${imagen}','${fecha_publicacion}');
    END;`;
    let result: OracleDB.Result<any> = await connection.execute(query,
        { id_prod: { dir: OracleDB.BIND_OUT, type: OracleDB.NUMBER } },
        { autoCommit: true });
    try {
        if (result.outBinds) {
            res.json({ id_producto: result.outBinds.id_prod });
        } else {
            res.send(null);
        }
    } catch (err) {
        res.send(null);
    }
}

export async function insertKeyWord(req: Request, res: Response) {
    let binds = req.body.array;
    for (let index = 0; index < binds.length; index++) {
        const element = binds[index].value;
        let query1 = `INSERT INTO PALABRA_CLAVE(palabra_clave) VALUES('${element}')`;
        try {
            await connection.execute(query1, [], { autoCommit: true });
        } catch (err) { }
    }
    let id_producto = req.body.id_product;
    let query2 = `INSERT INTO PRODUCTO_CLAVE(producto,palabra_clave) VALUES(${id_producto}, :value)`;
    try {
        await connection.executeMany(query2, binds, { autoCommit: true });
        res.json({ message: "todo bien" });
    }
    catch (err) {
        res.status(500);
    }

}