import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateChatResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: history,
      config: {
        systemInstruction: `You are the exclusive AI Concierge for DataZync Properties. 
        Your tone is sophisticated, professional, and Apple-like (clean, minimal, helpful).
        
        The user experience follows a structured flow, but you can answer any side questions elegantly.
        
        Flow Overview:
        1. Welcome & Budget Selection
        2. Location Interest
        3. Project Type (Villa, Plot, Penthouse)
        4. Specific Project Recommendations
        5. Contact Information Collection
        
        If you provide options, format them clearly. 
        When the user shares info, acknowledge it warmly.
        
        Budget ranges to use if asked:
        - Less than Rs. 50L
        - Rs. 50 Lakh - Rs. 1 Cr
        - Rs. 1 Cr - Rs. 2.5 Cr
        - Rs. 2.5 Cr - Rs. 5 Cr
        - Above Rs. 5 Cr
        
        Locations:
        - Manhattan, NY
        - Monte Carlo, ME
        - Lake Como, Italy
        - Joshua Tree, CA
        
        Always keep the conversation moving towards the goal: setting up a private tour or collecting lead details.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, I'm experiencing a brief technical interruption. How else can I assist you with your property search?";
  }
};
