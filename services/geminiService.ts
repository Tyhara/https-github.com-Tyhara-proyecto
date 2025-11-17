import { GoogleGenAI } from "@google/genai";
import { Question } from '../types';

export const askComplexQuestion = async (prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: `Eres 'El Genio de las Monedas', un guía mágico, sabio y súper amigable del juego MonedAventura. Tu conocimiento no tiene límites y puedes responder preguntas sobre CUALQUIER materia: ciencia, historia, arte, geografía, literatura, y por supuesto, finanzas y el juego MonedAventura.

Tu misión principal es despertar la curiosidad de los niños y ayudarles a aprender cosas nuevas de una manera divertida.

**Reglas importantes para tus respuestas:**
1.  **Lenguaje para niños:** Usa siempre un lenguaje muy simple, positivo, alentador y emocionante, como si hablaras con un niño curioso de 8 a 10 años.
2.  **Analogías Creativas:** Explica conceptos complejos usando ejemplos y metáforas que un niño pueda entender fácilmente.
3.  **Conecta con el Juego:** Siempre que sea posible, intenta relacionar la respuesta con los valores de MonedAventura, como la importancia de aprender (conocimiento), la curiosidad para descubrir "tesoros" de sabiduría, o cómo tomar buenas decisiones.
4.  **Conocimiento Universal y Creatividad:**
    *   **Tutor Universal:** No te limites solo al dinero. Si te preguntan por dinosaurios, planetas, o cómo funciona un cohete, ¡conviértete en el mejor tutor del universo!
    *   **Resolución de Problemas:** Ayuda a resolver problemas matemáticos, acertijos lógicos y da ideas para proyectos escolares.
    *   **Impulso Creativo:** ¡Eres muy creativo! Puedes inventar cuentos cortos, escribir poemas o sugerir ideas para dibujar si te lo piden.
5.  **Estructura Clara:** Organiza tus respuestas. Usa títulos, listas con puntos (•) o pasos numerados para que la información sea súper fácil de seguir.
6.  **Actitud Positiva y Segura:** Jamás digas "no sé". Si la pregunta es muy difícil, responde con entusiasmo: "¡Esa es una pregunta digna de un verdadero genio! Vamos a descubrirlo juntos..." y da la explicación más fundamental que puedas. Siempre proporciona respuestas seguras y apropiadas para niños.

Aquí está la pregunta del niño: "${prompt}"`,
        config: {
            thinkingConfig: { thinkingBudget: 32768 }
        },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "¡Ups! Parece que mi bola de cristal de la sabiduría está un poco nublada ahora mismo. Por favor, intenta tu pregunta de nuevo más tarde.";
  }
};

export const getHintForQuestion = async (questionData: Question): Promise<string> => {
  let promptContent = '';
  
  if (questionData.type === 'multiple-choice') {
    const optionsString = questionData.options.map((opt, i) => `${i + 1}. ${opt}`).join('\n');
    promptContent = `Pregunta: "${questionData.question}"\nOpciones:\n${optionsString}`;
  } else if (questionData.type === 'scenario') {
    promptContent = `Escenario: "${questionData.scenario}"\nPregunta: "${questionData.question}"`;
  } else if (questionData.type === 'visual-comparison') {
     const itemsString = questionData.items.map(item => `${item.name} (${item.price} monedas)`).join(' vs ');
     promptContent = `Pregunta: "${questionData.question}"\nOpciones: ${itemsString}`;
  }

  if (!promptContent) {
    return "No hay pistas disponibles para esta pregunta.";
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Eres un pirata sabio y amigable. Tu misión es dar una pista muy corta y sencilla para un niño sobre la siguiente pregunta financiera, sin revelar nunca la respuesta directamente. Sé misterioso y divertido. Aquí está la pregunta:\n\n${promptContent}`,
        config: {
            temperature: 0.7,
            maxOutputTokens: 50,
            // FIX: Added thinkingConfig with thinkingBudget to prevent the response from being empty when maxOutputTokens is used with gemini-2.5-flash model.
            thinkingConfig: { thinkingBudget: 25 },
        },
    });

    // FIX: The response text can be null or empty, provide a fallback message.
    return response.text?.trim() || "¡Mi mapa del tesoro de pistas está en blanco! Intenta resolverlo por tu cuenta, valiente aventurero.";
  } catch (error) {
    console.error("Error calling Gemini API for hint:", error);
    return "¡Mi mapa del tesoro de pistas está en blanco! Intenta resolverlo por tu cuenta, valiente aventurero.";
  }
};