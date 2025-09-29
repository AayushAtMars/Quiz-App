import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

let generativeModel;

if (API_KEY) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  generativeModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
} else {
  console.error("VITE_GEMINI_API_KEY is not defined. Check your .env file.");
}

/**
 * Fetch multiple-choice questions from Gemini API
 * @param {string} topic - Topic of the quiz
 * @param {number} questionCount - Number of questions to generate
 * @returns {Promise<Array>} - Array of MCQs
 */
export const getMCQs = async (topic, questionCount) => {
  if (!generativeModel) return [];

  const prompt = `
    Generate ${questionCount} multiple choice questions about ${topic}.
    Respond ONLY with a valid JSON array in this exact format:
    [
      {
        "question": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "answer": "Paris"
      }
    ]
  `;

  try {
    const result = await generativeModel.generateContent(prompt);
    let text = result.response.text();

    // ⚡ Strip markdown code fences like ```json or ```
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);
  } catch (err) {
    console.error("Error calling Gemini API:", err);
    return [];
  }
};
