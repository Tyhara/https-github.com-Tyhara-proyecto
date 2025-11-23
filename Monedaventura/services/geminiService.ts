
import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, ChildProfile } from "../types";

// Inicialización segura: Si no hay API KEY, no fallará inmediatamente al importar, sino al llamar.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateFinancialQuiz = async (topic: string = 'savings'): Promise<QuizQuestion | null> => {
  if (!apiKey) {
      console.warn("Falta API_KEY de Gemini");
      return null;
  }
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate a fun, simple multiple-choice question about "${topic}" for an 8-year-old child. 
    The tone should be encouraging and playful. Provide 3 options. Include a short explanation.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "explanation"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as QuizQuestion;
    }
    return null;
  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
};

// Actualizado: Recibe 'profile' completo para tener contexto de la Base de Datos
export const askFinancialGenius = async (userMessage: string, profile: ChildProfile): Promise<string> => {
  if (!apiKey) return "¡Oh no! Mis poderes mágicos necesitan una llave (API KEY) para funcionar.";

  try {
    const model = 'gemini-2.5-flash';
    
    // Detección de rol basada en el nombre del perfil
    const isTutor = profile.name.toLowerCase().includes('tutor') || profile.name.toLowerCase().includes('padre');
    
    // Contexto enriquecido con datos de la Base de Datos (Supabase)
    const contextData = `
      DATOS DEL USUARIO (Desde Base de Datos):
      - Nombre: ${profile.name}
      - Grado Escolar: ${profile.grade}
      - Monedas Actuales: ${profile.stats.coins}
      - Felicidad: ${profile.stats.happiness}%
      - Conocimiento: ${profile.stats.knowledge}%
      - Racha de Días: ${profile.dailyStreak}
      - Mapas Desbloqueados: ${profile.unlockedMaps.join(', ')}
    `;

    const systemPrompt = `
      ROL: Eres "El Genio de las Finanzas" (🧞‍♂️✨), el mentor experto del videojuego "Monedaventura".
      
      ${contextData}

      TU MISIÓN: Educar financieramente utilizando los datos reales del usuario para personalizar el consejo.
      
      ESTRATEGIAS PROFESIONALES:
      1. Si el usuario tiene pocas monedas (<50), anímalo a ahorrar en el juego y en la vida real.
      2. Si su felicidad es baja, recuérdale que el dinero es un medio, no el fin.
      3. Usa metáforas: El Ahorro son "Semillas", la Inflación es el "Dragón de Precios", el Presupuesto es el "Mapa".
      
      ADAPTACIÓN AL PÚBLICO:
      - SI ES NIÑO (${profile.grade}): Sé divertido, usa emojis, habla de juguetes, dulces y aventuras.
      - SI ES TUTOR: Sé pedagógico, explica cómo enseñar el concepto al niño.

      REGLAS DE SEGURIDAD:
      - No des consejos de inversión real (bolsa, cripto).
      - Mantén el tono educativo y seguro.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: userMessage,
      config: { systemInstruction: systemPrompt }
    });

    return response.text || "Mis bolas de cristal están nubladas. Pregúntame de nuevo.";
  } catch (error) {
    console.error("Error in Genius Mode:", error);
    return "El Genio está contando sus monedas... (Error de conexión, revisa tu API Key).";
  }
};
