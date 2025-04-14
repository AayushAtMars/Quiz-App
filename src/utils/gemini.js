const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getMCQs = async (topic, questionCount) => {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Generate ${questionCount} multiple choice questions about ${topic} in this exact JSON format:
[
  {
    "question": "What is the capital of France?",
    "options": ["Berlin", "Madrid", "Paris", "Rome"],
    "answer": "Paris"
  }
]
Make sure it's valid JSON with double quotes. Do not include any Markdown formatting. and this example question`,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

  try {
    const rawJSON = text.match(/\[.*\]/s)?.[0]; // matches the entire JSON array
    return JSON.parse(rawJSON);
  } catch (e) {
    console.error("Error parsing Gemini output:", e);
    return [];
  }
};
