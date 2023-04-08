import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
const TWITCH_CLIENT_ID = process.env.TWITCH_ID_CLIENT || '';
const TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN || '';
const twitchAuth = new ClientCredentialsAuthProvider(TWITCH_CLIENT_ID, TWITCH_ACCESS_TOKEN);
const twitchClient = new ApiClient({ authProvider: twitchAuth });

// función para comprobar si un usuario sigue al canal
async function checkIfUserFollows(username : string, broadcaster : string) {
  try {
    //Obtenemos el id del seguidor
    const user = await twitchClient.helix.users.getUserByName(username);
    //Obtenemos el id del streamer
    const broadcasteId = await twitchClient.helix.users.getUserByName(broadcaster);
    /* const userFollows = await twitchClient.helix.users.getFollows({ followedUser: user?.id }); */
    const validate = await twitchClient.helix.users.userFollowsBroadcaster(user?.id? user.id : '', broadcasteId?.id? broadcasteId.id : '')
    return validate ? validate : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { checkIfUserFollows };