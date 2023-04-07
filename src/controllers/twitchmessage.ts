import tmi, { ChatUserstate } from "tmi.js";
import { Client } from "discord.js";
import { discordChatMessage, sendTwitchFromDiscord } from "./discordMessageSend";
import { openai, run, getModels } from "../config/openai";
import { createUsers, getUserPoints } from "./usersControllers";
import { validateCommands, CommandValidationResult, CommandPermissions, UserPermissions } from "../utils/validateCommands";

  const twitchCommands = async (client: tmi.Client, discordClient: Client) => {
	client.on("message", async (channel: string, tags: ChatUserstate, message: string, self: boolean) => {
		if (self) return; // ignore messages from the bot itself

    const args = message.slice(1).split(" ");
    const command = args.shift()?.toLowerCase();

    const isVIP = tags.badges?.vip != null;
    const isSubscriber = tags.badges?.subscriber != null;
    const isFollower = tags.badges?.founder != null
    const isBroadcaster = tags.badges?.broadcaster != null;
    const isModerator = tags.badges?.moderator != null;
    const isPartner = tags.badges?.partner != null;

    const msjSend = message ? message: '';
    const userName = tags.username ? tags.username : '';
    await discordChatMessage(discordClient, `${userName}: ${msjSend}`);
	  await sendTwitchFromDiscord(discordClient, client);

    const userPermissions: UserPermissions = {
      isVIP: isVIP,
      isSubscriber: isSubscriber,
      isFollower: isFollower,
      isBroadcaster: isBroadcaster,
      isModerator: isModerator,
      isPartner: isPartner,
    };

    const commandPermissions: CommandPermissions = {
      free: ['informacion', 'comandos', 'saludo'],
      premium: ['models', 'gpt', 'registrar', 'puntos'],
      followerOrHigher: ['registrar', 'puntos'],
      moderatorOrHigher: ['models', 'gpt', 'registrar', 'puntos']
    };

    const allowedCommands = await validateCommands(command ? command : '', userPermissions, commandPermissions);

    if(allowedCommands){
      if (command === "saludo") {
        client.say(channel, `Hola @${tags.username}!`);
      }

      if(command === "informacion"){
        const msg = `Hola @${tags.username}! actualmente el sistema esta en BETA y pronto se podrá usar los puntos para cambiar por articulos o regalos!, puedes entrar a mi discord para mas novedades https://discord.gg/QzaB7sm2`;
        await discordChatMessage(discordClient, msg);
        client.say(channel, msg);
      }

      if (command === "comandos") {
        const msg = `Hola @${tags.username}! estos son los comandos: !models - !gpt - !registrar - !puntos -`;
        await discordChatMessage(discordClient, msg);
        client.say(channel, msg);
      }
      if(command === "models"){
        if (!allowedCommands.hasPermission) {
          const msg = `Sistema: Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.`;
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

      if (command === "registrar"){
        if (!allowedCommands.hasPermission) {
          const msg = `Sistema: Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.`;
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
          const msg = `Sistema: Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.`;
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

      if (command === "gpt") {
        if (!allowedCommands.hasPermission) {
          const msg = `Sistema: Lo siento, este comando solo puede ser ejecutado por Seguidores, VIP, suscriptores o administradores.`;
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
    }
  });
};

export default twitchCommands;