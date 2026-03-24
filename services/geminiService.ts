import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION, DIRTY_TRICKS_INSTRUCTION } from '../constants';
import { GeneratedContent } from '../types';

const apiKey = process.env.GEMINI_API_KEY;

export const generateMusicPrompt = async (userInput: string, isDirtyTricks: boolean = false, lyricsInput?: string, tempo?: string, musicalKey?: string): Promise<GeneratedContent> => {
  console.log("generateMusicPrompt called with:", { userInput, isDirtyTricks, lyricsInput, tempo, musicalKey });
  if (!apiKey) {
    console.error("API Key is missing in process.env");
    throw new Error("API Key is missing in process.env");
  }

  const ai = new GoogleGenAI({ apiKey });
  console.log("GoogleGenAI initialized");

  const schema = isDirtyTricks ? {
    type: Type.OBJECT,
    properties: {
      styleTags: {
        type: Type.STRING,
        description: "Comma-separated style tags following the Dirty Tricks protocol.",
      },
      lyrics: {
        type: Type.STRING,
        description: "The processed lyrics string. CRITICAL: This MUST be formatted with [Section Headers] (e.g., [Verse 1: Style | Mood]) before every block of text. Do NOT return the raw input string.",
      }
    },
    required: ["styleTags", "lyrics"],
  } : {
    type: Type.OBJECT,
    properties: {
      fullPrompt: {
        type: Type.STRING,
        description: "The complete, cohesive musical prompt following the mandatory formula.",
      },
      elementBreakdown: {
        type: Type.ARRAY,
        description: "A detailed breakdown of each instrument or musical element described in the prompt.",
        items: {
          type: Type.OBJECT,
          properties: {
            element: { type: Type.STRING, description: "The name of the instrument or element." },
            description: { type: Type.STRING, description: "The specific sonic description and settings used for this element." },
          },
          required: ["element", "description"],
        },
      },
    },
    required: ["fullPrompt", "elementBreakdown"],
  };

  try {
    let promptText = `Generate a music prompt for the following input: "${userInput}".`;
    if (tempo) promptText += `\nSuggested Tempo: ${tempo}`;
    if (musicalKey) promptText += `\nSuggested Key: ${musicalKey}`;

    if (isDirtyTricks && lyricsInput && lyricsInput.trim().length > 0) {
      promptText += `\n\nTASK: The user has provided RAW LYRICS. Your job is to ACT AS A LYRIC FORMATTER. You MUST break these lyrics down into verses, choruses, etc., and add [Section Headers] with style descriptors before each block. \n\nRULES:\n1. Every block MUST have a header like [VERSE 1: Style | Mood | Technical].\n2. Do NOT output the lyrics as a single continuous block.\n3. Add ad-libs and musical cues.\n\nRAW LYRICS TO PROCESS:\n"${lyricsInput}"`;
    } else {
      promptText += `\n\nEnsure strict adherence to the defined protocol.`;
    }

    console.log("Calling ai.models.generateContent...");
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{ text: promptText }]
        }
      ],
      config: {
        systemInstruction: isDirtyTricks ? DIRTY_TRICKS_INSTRUCTION : SYSTEM_INSTRUCTION,
        temperature: 0.8, // Slightly higher creative freedom for dirty tricks
        // maxOutputTokens removed to prevent truncation and allow model thinking
        responseMimeType: 'application/json',
        responseSchema: schema,
      }
    });
    console.log("API response received:", response);

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }

    try {
      const parsed = JSON.parse(text);
      
      // Normalize result to match GeneratedContent interface
      if (isDirtyTricks) {
        return {
          fullPrompt: parsed.styleTags || "", // Fallback
          styleTags: parsed.styleTags,
          lyrics: parsed.lyrics,
          isDirtyTricks: true
        };
      } else {
        return {
          fullPrompt: parsed.fullPrompt,
          elementBreakdown: parsed.elementBreakdown,
          isDirtyTricks: false
        };
      }
      
    } catch (e) {
      console.error("Failed to parse JSON response", e);
      console.error("Raw text:", text);
      throw new Error("AI response was not valid JSON");
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
