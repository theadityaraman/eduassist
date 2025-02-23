import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  
  const { transcript } = req.body;
  
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI tutor that generates quiz questions based on a transcript." },
        { role: "user", content: `Generate three quiz questions from this transcript: ${transcript}` },
      ],
    });
    
    res.status(200).json({ questions: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
