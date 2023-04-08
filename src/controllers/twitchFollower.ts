import { ApiClient } from 'twitch';
import { ClientCredentialsAuthProvider } from 'twitch-auth';
const TWITCH_CLIENT_ID = process.env.TWITCH_ID_CLIENT || '';
const TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN || '';
const twitchAuth = new ClientCredentialsAuthProvider(TWITCH_CLIENT_ID, TWITCH_ACCESS_TOKEN);
const twitchClient = new ApiClient({ authProvider: twitchAuth });

// función para comprobar si un usuario sigue al canal
async function checkIfUserFollows(username : string) {
    console.log(username);
  try {
    const user = await twitchClient.helix.users.getUserByName(username);
    const userFollows = await twitchClient.helix.users.getFollows({ followedUser: user?.id });
    return userFollows.total > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export { checkIfUserFollows };