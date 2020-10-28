import oracledb from 'oracledb'
export var connection:oracledb.Connection;
// revisa si es posible la conexion y se almacena la variable en connection
export async function checkConnection() {
    try {
        connection = await oracledb.getConnection({
            user: 'ferjo',
            password: 'ferjo',
            connectString: 'localhost:1521/ORCLCDB.localdomain'
        });
        
        console.log("Successfully connected to Oracle!")
        
    } catch (err) {
        console.log("Error: ", err);
    }
}

// una vez que se deja de usar la base de datos se debe de cerrar la conexion
export async function closeConnection() {
    if (connection) {
        try {
            await connection.close();
        } catch (err) {
            console.log("Error when closing the database connection: ", err);
        }
    }
}
