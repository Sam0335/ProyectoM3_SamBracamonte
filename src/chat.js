
//Crea div de mensajes
function createMessageElement(role, content) {
    const div = document.createElement("div");
    div.className = `message ${role}`;
    div.textContent = content;
    return div;
}

//Agrega scroll automático al final del chat
function scrollToBottom() {
    const messages = document.querySelector("#messages");
    messages?.scrollTo({ top: messages.scrollHeight, behavior: "smooth" });
}

//Agrega mensaje al DOM
function addMessageToDOM(role, content) {
    const messages = document.querySelector("#messages");
    messages?.appendChild(createMessageElement(role, content));
    scrollToBottom();
}

// API
async function fetchChatResponse(history) {
    const response = await fetch("/api/functions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages: history,
        }),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error del servidor");
    }

    return (await response.json()).response;
}

// Chat
export function setupChat() {
    const form = document.querySelector("#chat-form");
    const input = document.querySelector("#chat-input");
    const messages = document.querySelector("#messages");

    if (!form || !input || !messages) {
        console.error("setupChat: no se encontraron los elementos del DOM");
        return;
    }

    let chatHistory = [];
    let isWaiting = false;

    const handleSend = async () => {
        const text = input.value.trim();
        if (!text || isWaiting) return;

        isWaiting = true;
        input.value = "";
        input.disabled = true;

        chatHistory.push({ role: "user", content: text });
        addMessageToDOM("user", text);

        try {
            const answer = await fetchChatResponse(chatHistory);
            chatHistory.push({ role: "model", content: answer });
            addMessageToDOM("model", answer);
        } catch (error) {
            addMessageToDOM("model", "¡Rayos! Algo salió mal con la conexión, Nakama. ¡Vuelve a intentarlo más tarde!");
            console.error("Error en chat:", error);
        } finally {
            isWaiting = false;
            input.disabled = false;
            input.focus();
        }
    };

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        handleSend();
    });
}
