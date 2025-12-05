import { GoogleGenAI } from "@google/genai";
import { ARTWORKS } from '../data';

// Initialize the Gemini AI client
// Note: process.env.API_KEY is handled by the runtime environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getArtAdvisorResponse = async (userMessage: string, history: {role: string, text: string}[]): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    // Construct the context about the gallery
    const inventoryContext = ARTWORKS.map(art => 
      `- "${art.title}" (${art.category}): $${art.price}. ${art.description}. Available: ${art.available ? 'Yes' : 'No'}`
    ).join('\n');

    const systemInstruction = `
      You are the Art Advisor and Curator for the Sketchy Gallery. 
      Your name is "Aura".
      You are sophisticated, knowledgeable, and polite.
      Your goal is to help visitors find artwork from our collection that matches their tastes, budget, or interior design needs.
      
      Here is our current collection:
      ${inventoryContext}
      
      Rules:
      1. Only recommend artworks from the list above.
      2. If a user asks about buying, suggest they click the "Inquire on WhatsApp" button on the artwork details.
      3. Keep your responses concise (under 100 words) but elegant.
      4. If the user asks for something we don't have, politely explain our style (Contemporary, Abstract, Moody) and suggest the closest match.
      5. Do not make up artworks that are not in the list.
    `;

    // Convert history to the format expected by the SDK if needed, 
    // but for simple chat generation we can often just append context or use chat sessions.
    // Here we will use a fresh chat session seeded with history for simplicity in this stateless service wrapper
    // or just use generateContent with a constructed prompt if we want to be purely functional.
    
    // Let's use the Chat API for better context management
    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text;

  } catch (error) {
    console.error("Error communicating with Art Advisor:", error);
    return "I apologize, but I am currently reflecting on a complex piece of art and cannot answer. Please try again in a moment.";
  }
};