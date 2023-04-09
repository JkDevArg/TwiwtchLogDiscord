import tmi, { ChatUserstate } from "tmi.js";
import { Client } from "discord.js";
import { discordChatMessage, sendTwitchFromDiscord } from "./discordMessageSend";
import { openai, run, getModels } from "../config/openai";
import { createUsers, getUserPoints, setAddUserPoints } from "./usersControllers";
import { validateCommands, CommandPermissions, UserPermissions } from "../utils/validateCommands";
import { getFreeComments } from "../commands/freeCommands";
import { checkIfUserFollows } from "./twitchFollower";

const twitchCommands = async (client: tmi.Client, discordClient: Client) => {
	client.on("message", async (channel: string, tags: ChatUserstate, message: string, self: boolean) => {
		if (self) return; // ignore messages from the bot itself
    const args = message.slice(1).split(" ");
    const command = args.shift()?.toLowerCase();
    //PARAMS
    const userparam = args[0] ? args[0].toLowerCase() : '';
    const params = args[1] ? parseInt(args[1]) : '';
    const comment = args[2] ? args[1].toLowerCase() : '';
    //END PARAMS
    const isVIP = tags.badges?.vip != null;
    const isSubscriber = tags.badges?.subscriber != null;
    const isBroadcaster = tags.badges?.broadcaster != null;
    const isModerator = tags.badges?.moderator != null;
    const isPartner = tags.badges?.partner != null;

    const msjSend = message ? message: '';
    const userName = tags.username ? tags.username : '';

    const isFollower = await checkIfUserFollows(userName, "fetugamer");
    await discordChatMessage(discordClient, `${userName}: ${msjSend}`);
	  await sendTwitchFromDiscord(discordClient, client);

    const userPermissions: UserPermissions = {
      isVIP: isVIP,
      isSubscriber: isSubscriber || isFollower,
      isBroadcaster: isBroadcaster,
      isModerator: isModerator,
      isPartner: isPartner,
    };

    const commandPermissions: CommandPermissions = {
      free: ['informacion', 'comandos', 'saludo'],
      premium: ['models', 'gpt', 'registrar', 'puntos'],
      followerOrHigher: ['registrar', 'puntos'],
      moderatorOrHigher: ['models', 'gpt', 'registrar', 'puntos'],
      broadcasterOnly: ['apuntos', 'rpuntos']
    };

    const allowedCommands = await validateCommands(command ? command : '', userPermissions, commandPermissions);

    //Free commands
    if(commandPermissions.free.includes(command ? command : '')){
      const freeComments = await getFreeComments(command ? command : '', userName);
      await discordChatMessage(discordClient, freeComments);
      client.say(channel, freeComments);
    }
    //End free commands

    if (command === "registrar"){
      if (!allowedCommands.hasPermission) {
        const msg = `Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.`;
        await discordChatMessage(discordClient, msg);
        client.say(channel, msg);
        return;
      }else{
        const userName = tags.username ? tags.username : '';
        const userId = tags["user-id"] ? tags["user-id"] : '';
        const msg = `Sistema: Registrando usuario...`;
        client.say(channel, msg);
        await discordChatMessage(discordClient, msg);
        const res = await createUsers(userName, userId);
        client.say(channel, `Sistema: ${userName} ${res}`);
        await discordChatMessage(discordClient, `Sistema: ${userName} ${res}`);
      }
    }

    if(command === "puntos"){
      if (!allowedCommands.hasPermission) {
        const msg = `Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.`;
        await discordChatMessage(discordClient, msg);
        client.say(channel, msg);
        return;
      }else{
        const userId = tags["user-id"] ? tags["user-id"] : '';
        const res = await getUserPoints(userId);
        await discordChatMessage(discordClient, `Sistema: ${res}`);
        client.say(channel, `Sistema: ${res}`);
      }
    }

    if(command === "apuntos" || command === "rpuntos"){
      if (!allowedCommands.hasPermission) {
        const msg = `Lo siento, este comando solo puede ser ejecutado por el streamer o un administrador.`;
        await discordChatMessage(discordClient, msg);
        client.say(channel, msg);
        return;
      }else{
        const username = userparam ? userparam : '';
        const cant = params ? params : 0;
        const type = (command==="apuntos" ? 0 : (command==="rpuntos" ? 1 : 0));
        const addcomment = comment ? comment : '';
        const res = await setAddUserPoints(username, cant, type, addcomment);
        await discordChatMessage(discordClient, `Sistema: ${res}`);
        client.say(channel, `Sistema: ${res}`);
      }
    }

    if(command === "models"){
      if (!allowedCommands.hasPermission) {
        const msg = `Lo siento, este comando solo puede ser ejecutado por VIP, suscriptores o administradores.`;
        await discordChatMessage(discordClient, msg);
        client.say(channel, msg);
        return;
      }else{
        const models = await getModels();
        const modelString = models.join(", ");
        await discordChatMessage(discordClient, `ChatGPT: ${modelString}`);
        client.say(channel, `ChatGPT: Modelos disponibles > ${modelString}`);
      }
    }

    if (command === "gpt") {
      if (!allowedCommands.hasPermission) {
        const msg = `Lo siento, este comando solo puede ser ejecutado por VIP, suscriptores o administradores.`;
        await discordChatMessage(discordClient, msg);
        client.say(channel, msg);
        return;
      }else{
        if(message.length > 0){
          try {
            const responseGPT = await run(message);
            //Send discord msg from CHAT GPT
            await discordChatMessage(discordClient, `ChatGPT: ${responseGPT}`);
            client.say(channel, `ChatGPT: ${responseGPT}`)
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  });
};

export default twitchCommands;