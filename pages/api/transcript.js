import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");
  
  const { videoUrl } = req.body;
  
  try {
    const response = await openai.createTranscription({
      model: "whisper-1",
      url: videoUrl,
    });
    
    res.status(200).json({ transcript: response.data.text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
