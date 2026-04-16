# Chat IA Módulo 3
**Nombre:** Sam Bracamonte  

## Descripción

Aplicación web interactiva que te permite conversar con Luffy, impulsado por la IA de Google Gemini. Este proyecto es una Single Page Application (SPA) con 3 ventanas, una de ellas integrando una API de IA con una interfaz dinámica en forma de chat.

## Despliegue

[App desplegada en Vercel](https://chat-ai-con-luffy.vercel.app/)

## Stack Tecnológico

- **Frontend:** JavaScript vanilla + HTML5 + CSS
- **IA:** Google Gemini 2.5 Flash
- **Backend:** Vercel Serverless Functions
- **Routing:** History API (SPA sin recargas)
- **Testing:** Vitest
- **Deployment:** Vercel

## Estructura del Proyecto

```
ProyectoM3_SamBracamonte/
├── api/
│   └── functions.js           # Serverless function - proxy a Gemini
├── img/
│   └── luffy.png              # Imagen del personaje
├── src/
│   ├── app.js                 # Lógica principal y navegación SPA
│   ├── chat.js                # Controlador de chat y manejo de mensajes
│   └── utils.js               # Funciones auxiliares
├── tests/
│   └── utils.test.js          # Tests unitarios
├── index.html                 # HTML base
├── styles.css                 # Estilos de la aplicación
├── package.json               
├── vercel.json                # Configuración de Vercel
└── README.md
```

## Instrucciones para ejecutar localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/Sam0335/ProyectoM3_SamBracamonte
cd ProyectoM3_SamBracamonte
```

### 2. Crea el .env

Crea o edita el nombre de `.env.example` a `.env` y agrega tu API key de Gemini:

```
GEMINI_API_KEY=tu_clave_aqui
```
[Consigue tu clave aqui](https://aistudio.google.com/apikey)

### 3. Instalar Node

```bash
npm install
```

### 4. Ejecutar en local

```bash
npx serve .
```

## Ejecutar Tests

```bash
npm test
```

## Variables de Entorno

`GEMINI_API_KEY`= Clave API de Google Gemini para acceder al modelo


## Uso de IA

- Debugging en la integración con Google Gemini
- Optimización del sistema de routing SPA
- Refinamiento del system prompt
- Aclaración de dudas con tests unitarios
- Estructura base del README
