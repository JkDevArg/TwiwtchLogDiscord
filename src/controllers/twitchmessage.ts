import tmi, { ChatUserstate } from "tmi.js";
import { Client } from "discord.js";
import { discordChatMessage, sendTwitchFromDiscord } from "./discordMessageSend";
/* import { openAIConnect } from "../config/openai"; */

const twitchCommands = async (client: tmi.Client, discordClient: Client) => {
	client.on("message", async (channel: string, tags: ChatUserstate, message: string, self: boolean) => {
		if (self) return; // ignore messages from the bot itself

    const args = message.slice(1).split(" ");
    const command = args.shift()?.toLowerCase();

    const isVIP = tags.badges?.vip != null;
    const isSubscriber = tags.badges?.subscriber != null;
    const isBroadcaster = tags.badges?.broadcaster != null;
    const isModerator = tags.badges?.moderator != null;

    if (command === "gpt") {
		if (!isVIP && !isSubscriber && !isBroadcaster && !isModerator) {
			client.say(channel, `Lo siento, este comando solo puede ser ejecutado por VIP, suscriptores o administradores.`);
			return;
		}
    }

    if (command === "saludo") {
    	client.say(channel, `Hola @${tags.username}!`);
	}
    const msjSend = message ? message: '';
    const userName = tags.username ? tags.username : '';
    await discordChatMessage(discordClient, `${userName}: ${msjSend}`);
	  await sendTwitchFromDiscord(discordClient, client);

  });
};

export default twitchCommands;