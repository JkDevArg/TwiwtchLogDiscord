import { Client, TextChannel, Message  } from "discord.js";
import sendTwitchMessage from "../controllers/twitchmessage";

import "dotenv/config";

const discord_channel = process.env.DISCORD_CHANNEL_ID ? process.env.DISCORD_CHANNEL_ID : '';

async function discordChatMessage(discordClient: Client, message: string) {
	const channel = discordClient.channels.cache.get(discord_channel) as TextChannel;

	if (channel) {
		await channel.send(`[**Twitch**]: ${message}`);
	} else {
		console.log(`No se encontró el canal de Discord con ID ${discord_channel}`);
	}
}

async function sendTwitchFromDiscord(discordClient: Client, twitchClient: any): Promise<void> {
	console.log('manda un msj desde discord');
	//console.log(discordClient, twitchClient);
	/* discordClient.on("message", (message: Message) => {
		if (message.channel) {
			const twitchChannel = process.env.TWITCH_CHANNEL;
			if (twitchChannel && message.channel.id === process.env.DISCORD_CHANNEL_ID) {
				sendTwitchMessage(twitchClient, message.content);
			}
		}
	}); */
}

export { discordChatMessage, sendTwitchFromDiscord};