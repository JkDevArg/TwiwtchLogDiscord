import "dotenv/config";
import { Client, Events, GatewayIntentBits } from "discord.js";

async function discordClientConnect(): Promise<Client> {
	const token = process.env.DISCORD_APP_TOKEN;
	const client = new Client({ intents: [GatewayIntentBits.Guilds] });

 	client.once(Events.ClientReady, () => {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	});

	await client.login(token);

	return client;
}

export default discordClientConnect;