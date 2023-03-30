import "dotenv/config";
import tmi from "tmi.js";
import twitchCommands from "../controllers/twitchmessage";
import discordClientConnect from "./discord";

const TWITCH_USERNAME = process.env.TWITCH_USERNAME || '';
const TWITCH_PASSWORD = process.env.TWITCH_PASSWORD || '';
const TWITCH_CHANNEL = process.env.TWITCH_CHANNEL || '';

async function twitchClientConnect(): Promise<void> {
    const client = new tmi.Client({
        options: { debug: true },
        connection: {
            secure: true,
            reconnect: true
        },
        identity: {
            username: TWITCH_USERNAME,
            password: TWITCH_PASSWORD
        },
        channels: [ TWITCH_CHANNEL ]
    });

    const discordClient = await discordClientConnect();
    await client.connect();
    console.log("\x1b[32m%s\x1b[0m", "Twitch client connected.");

    twitchCommands(client, discordClient);
}

export default twitchClientConnect;