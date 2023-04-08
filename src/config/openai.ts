
import { OpenAIApi, Configuration } from "openai";


const cfg = new Configuration({
    apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(cfg);

async function run(msg:string){
    const runPrompt = async () => {
        //Quitamos el !gpt a la pregunta
        const prompt = msg.split("!gpt")[1].trim();
        //Configuramos nuestro IA
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "system", content: prompt}],
            temperature: 0.9,
            max_tokens: 100
        });
        //Retornamos lo que nos devuelve
        return response.data.choices[0].message?.content;
    }
    return runPrompt();
}

async function getModels(): Promise <string[]>{
    const models = await openai.listModels();
    const data = models.data.data;
    const filterIds = data
        .filter(model => !model.id.includes("-"))
        .map(model => model.id);
    return filterIds;
}

export { openai, run, getModels};