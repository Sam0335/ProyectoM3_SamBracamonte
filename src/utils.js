
// Formatea el mensaje eliminando espacios en blanco
export const formatMessage = (text) => {
    return text.trim();
};

// Valida el mensaje para asegurarse de que no esté vacío y no sea demasiado largo
export const validateInput = (input) => {
    const trimmed = input.trim();
    return trimmed.length > 0 && trimmed.length < 500;
};

// Genera un saludo personalizado de Luffy
export const getLuffyGreeting = (name = "nakama") => {
    return `¡Hola, soy Luffy! ¡Se ve que ${name} ha entrenado muy duro!`;
};

// Procesa la respuesta de la API para extraer el texto o manejar errores
export const parseApiResponse = (data) => {
    return data && data.text ? data.text : "¡Rayos! No pude entenderte, ¿puedes repetirlo?";
};
