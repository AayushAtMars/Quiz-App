import 'dotenv/config';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the correct model ID for Gemini 2.5 Flash
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

async function main() {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash", // Updated model ID
  });

  const result = await model.generateContent("Write a haiku about the sun");
  console.log(result.response.text());
}

main();
