import { executeStoredProcedure } from "../config/db";

async function createUserDB(username : string, id_twitch : string){
    try {
        const exec = await executeStoredProcedure('sp_set_new_users', [username, id_twitch]);
        const status = exec[0][0]['status'] ? exec[0][0]['status'] : 500;
        const msg = exec[0][0]['msg'] ? exec[0][0]['msg'] : '';
        if(status != '200' && msg == ''){
            return 'No se pudo registrar el usuario, vuelva a intentar';
        }
        return msg;
    } catch (error) {
        return 'Ya te encuentras registrado en el sistema';
    }
}

async function getUserPointsDb(id_twitch : string){
    try {
        const exec = await executeStoredProcedure('sp_get_points_by_id_users', [id_twitch]);
        const status = exec[0][0]['status'] ? exec[0][0]['status'] : 500;
        const msg = exec[0][0]['points'] ? exec[0][0]['points'] : '';
        if(status != '200' && msg == ''){
            return 'No se pudo obtener los puntos del usuario';
        }
        return msg;
    } catch (error) {
        return error;
    }
}

async function setAddUserPointsDb(username : string, points: number, type: number, comment: string){
    if(username && points > 0){
        /* return true; */
        try {
            const exec = await executeStoredProcedure('sp_set_points_user', [username, points, type, comment]);
            const status = exec[0][0]['status'] ? exec[0][0]['status'] : 500;
            const msg = exec[0][0]['msg'] ? exec[0][0]['msg'] : '';
            if(status != '200' && msg == ''){
                return 'No se pudo obtener los puntos del usuario';
            }
            return msg;
        } catch (error) {
            return error;
        }
    }else{
        return 'Upps! Hubo un error! Valida que hayas enviado todos los parametros.';
    }
}


export { createUserDB, getUserPointsDb, setAddUserPointsDb };
