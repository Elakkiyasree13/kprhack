import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { analyzeContentLocally } from './src/utils/analyzer.ts';
import { COMMUNITY_TRENDS } from './src/data/trendData.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'TruthShield AI Engine', timestamp: new Date().toISOString() });
});

// Trend stats endpoint
app.get('/api/stats', (req: Request, res: Response) => {
  res.json(COMMUNITY_TRENDS);
});

// Analyze content endpoint
app.post('/api/analyze', async (req: Request, res: Response) => {
  const { text, sourceType = 'text', language = 'en', level = 'Detailed' } = req.body;

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Text content is required for analysis.' });
  }

  const rawText = text.trim();

  // If GEMINI_API_KEY is available, use Gemini 3.8 Flash for deep extraction
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemPrompt = `You are TruthShield AI, an authoritative, unbiased, and educational misinformation detection system.
Given suspicious user content, extract individual factual claims and classify each as: 'TRUE', 'FALSE', 'MISLEADING', or 'UNVERIFIED'.
CRITICAL: Never classify claims as fake without evidence. If evidence is unavailable, classify as 'UNVERIFIED'.
Detect manipulation tactics (e.g. False Urgency, Fake Authority, Outrage Bait, Clickbait, Social Pressure, Fear Mongering, Conspiracy Framing, Misleading Statistics, Brand Impersonation).
Provide evidence sources, clear reasons, an 'Explain Like I'm 15' summary, translations in Tamil (ta), Hindi (hi), and Malayalam (ml), and a 'Misinformation Vaccine' educational module.`;

      const prompt = `Analyze this content:\n"${rawText}"\nExplanation Level: ${level}\nUser requested language: ${language}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallRisk: {
                type: Type.STRING,
                description: "HIGH RISK, MODERATE RISK, or LOW RISK",
              },
              riskScore: { type: Type.INTEGER },
              confidenceScore: { type: Type.INTEGER },
              summary: { type: Type.STRING },
              metrics: {
                type: Type.OBJECT,
                properties: {
                  truthfulness: { type: Type.INTEGER },
                  evidenceStrength: { type: Type.INTEGER },
                  manipulationRisk: { type: Type.INTEGER },
                  sourceReliability: { type: Type.INTEGER },
                },
              },
              claims: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    text: { type: Type.STRING },
                    verdict: { type: Type.STRING, description: "TRUE, FALSE, MISLEADING, or UNVERIFIED" },
                    confidence: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                    sources: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          id: { type: Type.STRING },
                          title: { type: Type.STRING },
                          publisher: { type: Type.STRING },
                          type: { type: Type.STRING },
                          reliability: { type: Type.STRING },
                          date: { type: Type.STRING },
                          url: { type: Type.STRING },
                          stance: { type: Type.STRING },
                          quote: { type: Type.STRING },
                          isDemo: { type: Type.BOOLEAN },
                        },
                      },
                    },
                  },
                },
              },
              tactics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    name: { type: Type.STRING },
                    category: { type: Type.STRING },
                    matchedText: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                    userTip: { type: Type.STRING },
                    color: { type: Type.STRING },
                  },
                },
              },
              eli15Explanation: { type: Type.STRING },
              translations: {
                type: Type.OBJECT,
                properties: {
                  en: {
                    type: Type.OBJECT,
                    properties: {
                      verdictLabel: { type: Type.STRING },
                      summary: { type: Type.STRING },
                      eli15: { type: Type.STRING },
                      actionTip: { type: Type.STRING },
                    },
                  },
                  ta: {
                    type: Type.OBJECT,
                    properties: {
                      verdictLabel: { type: Type.STRING },
                      summary: { type: Type.STRING },
                      eli15: { type: Type.STRING },
                      actionTip: { type: Type.STRING },
                    },
                  },
                  hi: {
                    type: Type.OBJECT,
                    properties: {
                      verdictLabel: { type: Type.STRING },
                      summary: { type: Type.STRING },
                      eli15: { type: Type.STRING },
                      actionTip: { type: Type.STRING },
                    },
                  },
                  ml: {
                    type: Type.OBJECT,
                    properties: {
                      verdictLabel: { type: Type.STRING },
                      summary: { type: Type.STRING },
                      eli15: { type: Type.STRING },
                      actionTip: { type: Type.STRING },
                    },
                  },
                },
              },
              vaccine: {
                type: Type.OBJECT,
                properties: {
                  tacticEncountered: { type: Type.STRING },
                  howTrickWorks: { type: Type.STRING },
                  howToProtect: { type: Type.STRING },
                  nextTimeExample: { type: Type.STRING },
                  microQuiz: {
                    type: Type.OBJECT,
                    properties: {
                      question: { type: Type.STRING },
                      options: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                      },
                      correctIndex: { type: Type.INTEGER },
                      explanation: { type: Type.STRING },
                    },
                  },
                },
              },
            },
          },
        },
      });

      const parsedJson = JSON.parse(response.text || '{}');
      if (parsedJson && parsedJson.claims && parsedJson.claims.length > 0) {
        return res.json({
          id: `gemini-analysis-${Date.now()}`,
          rawText,
          sourceType,
          timestamp: new Date().toISOString(),
          ...parsedJson,
        });
      }
    } catch (aiError) {
      console.warn('Gemini API call failed or timed out, gracefully falling back to local pipeline:', aiError);
    }
  }

  // Resilient heuristic engine fallback
  const localResult = analyzeContentLocally(rawText, sourceType);
  return res.json(localResult);
});

// Mount Vite or serve static assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`TruthShield AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
