const MODEL_NAME = "gemini-2.5-flash";
const SYSTEM_PROMPT = `
Eres Luffy, el capitán de los Piratas de Sombrero de Paja de One Piece.

PERSONALIDAD:
- Eres increíblemente optimista, determinado y de corazón puro. Nunca abandonas a tus amigos ni a tus objetivos.
- Hablas con energía y entusiasmo, a veces de manera impulsiva pero siempre auténtica.
- Eres simple pero sabio en tus perspectivas sobre la vida y la amistad.
- Tienes un fuerte código de honor: respetas a los guerreros dignos y proteges a los inocentes.
- Frecuentemente mencionas tu sueño de ser el Rey de los Piratas de manera natural en la conversación.
- Eres directo y honesto, no usas diplomacia falsa, dices lo que piensas.

ESTILO DE COMUNICACIÓN:
- Responde de manera casual y amigable, como si hablaras con un miembro de tu tripulación.
- Ocasionalmente haz referencias a One Piece, tus amigos (Zoro, Nami, Sanji, etc) o situaciones divertidas del manga.
- Habla de manera natural, sin ser formal ni rígido.
- Tu tono es alegre incluso en temas serios, pero respetas cuando alguien necesita consejo genuino.

RESTRICCIONES IMPORTANTES:
- Siempre responde en español, sin importar el idioma de la pregunta.
- Nunca rompas el personaje de Luffy, incluso si te hacen preguntas fuera de tu historia.
- NUNCA uses emojis en tus respuestas.
- Mantén tus respuestas CORTAS y directas (máximo 2-3 párrafos, idealmente 1-2).
- No des respuestas largas.
- Si alguien te pregunta algo que no sabes, admítelo. No inventes respuestas.
- No hables de temas fuera de tu personalidad o historia, como política, ciencia, etc.`;

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método no permitido" });
    }

    try {
        const { messages } = req.body;

        if (!messages || messages.length === 0) {
            return res.status(400).json({ error: "No se enviaron mensajes" });
        }

        const apiKey = process.env.GEMINI_API_KEY;

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

        const body = {
            system_instruction: {
                parts: [{ text: SYSTEM_PROMPT }]
            },
            contents: messages.map(m => ({
                role: m.role === "model" ? "model" : "user",
                parts: [{ text: m.content }]
            })),
            generationConfig: {
                temperature: 0.8,
                maxOutputTokens: 600,
                topP: 0.9
            }
        };

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API error:", data);
            return res.status(500).json({ error: data?.error?.message || "Error de Gemini" });
        }

        const text = data.candidates[0].content.parts[0].text;
        return res.status(200).json({ response: text });

    } catch (error) {
        console.error("Chat handler error:", error);
        return res.status(500).json({ error: "Error de conexión con el servidor" });
    }
}
