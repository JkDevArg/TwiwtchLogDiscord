import mysql from 'mysql2/promise';

async function connectDB(){
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_SERVER,
            user: process.env.DB_USER,
            database: process.env.DB_NAME
        });
        return connection;
    } catch (e: any) {
        throw new Error(`Error en la conexión a la base de datos: ${e.message}`);
    }
}

async function executeStoredProcedure(name: string, params: any[]): Promise<any[]> {
    let connection;
    const useDB = 'db_twitch';
    try {
        connection = await connectDB();
        const [rows] = await connection.execute(`CALL ${useDB}.${name}(${params.map(() => '?').join(',')})`, params);
        return rows as any[];
    } catch (err: any) {
        throw new Error(`Error al ejecutar el stored procedure: ${err.message}`);
    } finally {
        if (connection) await connection.end();
    }
}

export { executeStoredProcedure };
