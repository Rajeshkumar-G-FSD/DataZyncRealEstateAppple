export const generateChatResponse = async (history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ history }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from chat API');
    }

    const data = await response.json();
    return data.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, I'm experiencing a brief technical interruption. How else can I assist you with your property search?";
  }
};
