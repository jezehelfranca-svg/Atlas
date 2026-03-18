import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: "Who won the last Super Bowl?",
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            winner: { type: Type.STRING }
          }
        },
        tools: [{ googleSearch: {} }],
      }
    });
    console.log(response.text);
  } catch (e) {
    console.error("ERROR:", e);
  }
}

test();
