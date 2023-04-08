async function getFreeComments(command : string, username : string) : Promise <string>{
    var msg = '';
    if(command === "saludo"){
        var msg =  `Hola @${username}!`;
    }

    if(command === "informacion"){
        var msg =  `Hola @${username}! actualmente el sistema esta en BETA y pronto se podrá usar los puntos para cambiar por articulos o regalos!, puedes entrar a mi discord para mas novedades https://discord.gg/QzaB7sm2`;
    }

    if(command === "comandos"){
        var msg =  `Hola @${username}! estos son los comandos: !models - !gpt - !registrar - !puntos - !informacion - !comandos`;
    }

    return msg;
}


export { getFreeComments };