import { setupChat } from "./chat.js";

// Vistas de la aplicación
const app = document.querySelector("#app");

function homeView() {
    app.innerHTML = `
    <div class="home panel">
        <h1>Bienvenido a Proyecto M3</h1>
        <p>
            Proyecto M3 es una aplicación de chat conversacional impulsada por inteligencia artificial.
            Diseñada con una interfaz simple y accesible, permite mantener conversaciones fluidas y naturales con una IA que responde de forma directa y sin complicaciones.
        </p>
        <p>
            Para comenzar, dirigite a la sección de <a href="/chat">Chat</a> y escribí tu primera pregunta.
        </p>
    </div>`
};

function chatView() {
    app.className = "chat";
    app.innerHTML = `
    <section class="panel">
        <h1>Chat</h1>
        <div id="messages"></div>
        <form id="chat-form">
            <input id="chat-input" type="text" placeholder="Escribir mensaje...">
            <button type="submit">Send</button>
        </form>
    </section>

    <aside class="panel">
        <h1>Character Profile</h1>
        <img class="character-image" src="./img/luffy.png" alt="Luffy portrait">
        <h2>Monkey D. Luffy</h2>
        <p>Un joven pirata, capitan de los "Pirata de Sombrero de Paja". Su sueño es convertirse en el Rey de los Piratas, conocido por su valentía, optimismo y lealtad a sus amigos.</p>
        </aside>
    `;
    setupChat();
};

function aboutView() {
    app.innerHTML = `
        <div class="about panel">
            <h1>Sobre el Proyecto</h1>
            <p>
                Proyecto M3 es una aplicación web de chat con inteligencia artificial, desarrollada como proyecto
                personal con el objetivo de aprender e integrar tecnologías modernas de desarrollo web y APIs de IA.
                La aplicación permite al usuario mantener conversaciones en tiempo real con un asistente con la personalidad 
                de el personaje Monkey D. Luffy de la serie One Piece.
            </p>

            <h2>Tecnologías utilizadas</h2>
            <ul>
                <li><strong>Frontend:</strong> HTML, CSS y JavaScript</li>
                <li><strong>Backend:</strong> Node.js</li>
                <li><strong>IA:</strong> API de Gemini</li>
                <li><strong>Tests:</strong> Vitest</li>
            </ul>
        </div>
    `;
};

function renderNotFound() {
    app.innerHTML = `
        <div class="notFound panel">
            <h1>404 - Página no encontrada</h1>
            <p>La ruta "${window.location.pathname}" no existe.</p>
            <a href="/">Volver al inicio</a>
        </div>
    `;
};

// Rutas de la aplicación
const routes = {
    "/": homeView,
    "/chat": chatView,
    "/about": aboutView,
};

// Función para manejar el enrutamiento
function router() {
    const path = window.location.pathname;
    const render = routes[path] || renderNotFound;
    render();
};

// Manejar eventos de navegación
function navigateTo(path) {
    window.history.pushState(null, '', path);
    router();
};

document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    event.preventDefault();
    navigateTo(href);
});

// Inicializar la aplicación
window.addEventListener('popstate', router);

router();