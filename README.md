# TwiwtchLogDiscord
Save log or chat from Twitch to Discord


# Proyecto personal para conectar en sincronia Discord, Twitch y Chat GPT 3.5.

**Librerías que se utilizan**
- openai
- twitch
- tmijs
- discord.js


## Procesos de Configuración

Antes que nada deberán de obtener las API Key de 

[Chat GPT](https://platform.openai.com/account/api-keys).

Usurio de Twitch

[Contraseña Auth Twitch](https://twitchapps.com/tmi/).

[Twitch Id Client y Secret Key || Access Token](https://dev.twitch.tv/console/apps/).

[Discord APP Key && Discord APP Token && Discord APP ID](https://discord.com/developers/applications).

[Discord Channel ID](https://www.remote.tools/remote-work/how-to-find-discord-id

Una vez teniendo todo los accesos y demás es momento de crear el **.env**

```
PORT=5000
TWITCH_USERNAME= USUARIO DE TWITCH
TWITCH_PASSWORD= AUTH TMI DE TWITCH
TWITCH_CHANNEL= NOMBRE DEL CANAL DE TWITCH
TWITCH_ID_CHANNEL= ID DEL CANAL DE TWITCH
TWITCH_ID_CLIENT= ID DEL CLIENTE DE TWITCH
TWITCH_ACCESS_TOKEN= TWITCH ACCESS TOKEN
TWITCH_CLIENT_SECRET= ES EL MISMO QUE EL ACCESS TOKEN
DISCORD_APP_ID= ID DE LA APP DE DISCORD
DISCORD_APP_KEY= KEY APP DE DISCORD
DISCORD_APP_TOKEN= TOKEN DE LA APP DE DISCORD
DISCORD_CHANNEL_ID= ID DEL CANAL DEL DISCORD DONDE LLEGARA TODO EL REGISTRO
OPENAI_KEY= API KEY OBTENIDA DE OPEN AI

DB_SERVER= SERVIDOR BASE DE DATOS
DB_USER= USUARIO DB
DB_PASSWORD= CONTRASEÑA DB
DB_NAME= NOMBRE DE LA DB
CHARSET= POR DEFECTO UTF8
```


# Configurar OPEN AI
En el directorio ```src/config/openai.ts``` las siguientes lineas

```javascript
const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "system", content: prompt}],
    temperature: 0.9,
    max_tokens: 100
});
 ```
 
 Podemos configurar los siguientes parametros el modelo "gpt-3.5-turbo", la temperatura "0.9" y el consumo de tokens por defecto 100, 
 si las respuesta es mas larga deberán ocupar más cantidad de token eso es = a mas gasto.
 
 
 # Comandos
 
 Los comandos que pueden usar librement sin registro o permiso alguno los encontraras en ```src\commands\freeCommands.ts```
 
 Sientanse libre de modificar, mejorar o agregar comandos, este apartado es para que todos puedan usar los comandos sin restricción.
 
 Los demás comandos por rol o **badge** es en ```src\controllers\twitchUsersPoints.ts```
 
 ```javascript
 const commandPermissions: CommandPermissions = {
    free: ['informacion', 'comandos', 'saludo'],
    premium: ['models', 'gpt', 'registrar', 'puntos'],
    followerOrHigher: ['registrar', 'puntos'],
    moderatorOrHigher: ['registrar', 'puntos'],
    broadcasterOnly: ['apuntos', 'rpuntos', 'test1', 'models', 'gpt']
  };
  ```
  
  Los comandos se enlistan. 
  
  Por ej: Free estan esos 3 comandos, si agregas en el apartado anterior podrás agregar aqui también, igual para los demás comandos.
  
  **premium** = suscriptores o que den bits/chess.
  
  **followerOrHigher** = Seguidores o en adelante.
  
  **moderatorOrHigher** = Moderadores o en adelante.
  
  **broadcasterOnly** = Streamer
  
  # Instalación
  
 ```npm install```
 ```npm run dev```
  
  
  # Estructura
  
  En el apartado de ```src\config\``` encontraran las funciones para que se conecten a las libreria ya sea Twitch, Discord y OPEN AI.
  
  Los **controladores** en ```src\controllers\``` encontraremos los controladores donde ejecutan las acciones 
  uno de lo más importante es ```src\controllers\twitchmessage.ts```
  
  Donde encontraras los comandos y el uso de validaciones, si nos fijamos en la carpeta de ```src/validations/``` encontraremos un archivo llamado index.ts
  
  Ese archivo es donde recibe los parametros para poder validarlos y esa función la utilizamos en ```src/controllers/usersControllers.ts```
  donde utilizamos para validar los datos de envio para registra u obtener puntos, aparte de que tenemos la opción de agregar y restar puntos.
  
  
# Sistema y explicación
  
Es un sistema pequeño pero que va creciendo, actualmente se utiliza una base de datos donde guarda datos como los de usuarios para gestionar los puntos que ganan o
que pierden. Siendo el administrador tendrán acceso a ciertos comandos para poder gestionar los puntos en twitch, se implemento Chat GPT para gastar esos "puntos"
que se adquieren por la actividad en el stream, aparte de ello se esta implementado al chat gpt una función especial para poder enseñarle a tener una respuesta
dependiendo de nuestro titulo en twitch y la descripción del tal al momento de hacer stream.

El objetivo de esto es que se pueda utilizar la IA como un ejemplo de uso para accesibilidad y manejo del chat, también para poder conectarse con Discord
y mantener un registro de todo lo que sucede en el chat guardando el chat de cada stream y de lo que responde el chat gpt para mas adelante utilizarlo como
un prompt y enseñarle ciertas respuestas en cache.

El motivo de hacer esto fue para poder hacer un broadcaster y tener todo en conjunto, pronto se estará utilizando facebook y youtube para que se unan los 3 chats
y se pueda utilizar chat gpt en los 3 casos.

Si el proyecto te gusta te agradecería que lo apoyaras con un **Star** y un **Fork**
Estaré mejorando el sistema y agregando mas herramientas.
  
