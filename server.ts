import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI(process.env.GEMINI_API_KEY || "");

  // API routes go here
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/chat', async (req, res) => {
    try {
      const { history } = req.body;
      const model = ai.getGenerativeModel({ 
        model: "gemini-1.5-flash",
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
        - Gachibowli, Hyderabad
        - Kondapur, Hyderabad
        - Tellapur, Hyderabad
        - Banjara Hills, Hyderabad
        
        Always keep the conversation moving towards the goal: setting up a private tour or collecting lead details.`
      });

      const result = await model.generateContent({
        contents: history,
      });

      res.json({ text: result.response.text() });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
