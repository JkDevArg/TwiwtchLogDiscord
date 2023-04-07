import "dotenv/config";
import twitchClientConnect from "./config/twitch";
import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
/* import discordClientConnect from "./config/discord"; */

const PORT = process.env.PORT || 3000;
const app = express();

// Conectamos a Twitch y Discord
twitchClientConnect();
/* discordClientConnect(); */

// Agregamos el middleware de logging
app.use(morgan("dev"));

// Escuchamos en el puerto especificado
app.listen(PORT, () => console.log("\x1b[1m\x1b[4m\x1b[33m\x1b[40m%s\x1b[0m",`Server Open ${PORT}`))