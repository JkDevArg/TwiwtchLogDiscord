import { executeStoredProcedure } from "../config/db";
import { createUserDB, getUserPointsDb, setAddUserPointsDb } from "../services/users";
import { validateParams } from "../validations";

async function createUsers(username: string, id_twitch: string) {
    //Validamos que todo este ok
    const active = username && id_twitch ? true : false;
    const validate = validateParams({
        active: active,
        params: [
            {
                param: "string",
                date: username ? username : "",
            },
            {
                param: "string",
                date: id_twitch ? id_twitch : "",
            },
        ],
    });

    // Devolvemos el error
    if (!validate) {
        return validate;
    }

    // Llamamos al servicio
    const createUser = createUserDB(
        username,
        id_twitch
    );

    return createUser;
}

async function getUserPoints(id_twitch: string) {
    const active = id_twitch ? true : false;

    const validate = validateParams({
        active: active,
        params: [
            {
                param: "string",
                date: id_twitch ? id_twitch : "",
            },
        ],
    });

    // Devolvemos el error
    if (!validate) {
        return validate;
    }

    // Llamamos al servicio
    const userPoints = getUserPointsDb(
        id_twitch
    );

    return userPoints;
}

async function setAddUserPoints(username: string, cant: number, type: number, comment: string){
    const active = username ? true : false;

    const validate = validateParams({
        active: active,
        params: [
            {
                param: "string",
                date: username ? username : "",
            },
            {
                param: "number",
                date: cant ? cant : "",
            },
            {
                param: "number",
                date: type ? type : "",
            },
            {
                param: "string",
                date: comment ? comment : "",
            },
        ],
    });

    if (!validate) {
        return validate;
    }

    // Llamamos al servicio
    const userAddPoints = setAddUserPointsDb(
        username,
        cant,
        type,
        comment
    );

    return userAddPoints;

}

export { createUsers, getUserPoints, setAddUserPoints};
