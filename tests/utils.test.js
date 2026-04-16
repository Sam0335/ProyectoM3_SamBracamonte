import { describe, it, expect } from 'vitest';
import { formatMessage, validateInput, getLuffyGreeting, parseApiResponse } from '../src/utils.js';

describe('Utilidades del Chat', () => {
    
    describe('formatMessage aka Limpieza de texto', () => {
        it('eliminar espacios al inicio y final', () => {
            expect(formatMessage('  ¡Quiero ser Rey de los Piratas!  ')).toBe('¡Quiero ser Rey de los Piratas!');
        });

        it('mantiene espacios internos en el mensaje', () => {
            expect(formatMessage('  Zoro   Nami   Sanji  ')).toBe('Zoro   Nami   Sanji');
        });

        it('maneja strings vacíos', () => {
            expect(formatMessage('   ')).toBe('');
        });

        it('retorna el mismo texto si no hay espacios extras', () => {
            expect(formatMessage('Luffy')).toBe('Luffy');
        });
    });

    describe('validateInput aka Validación de mensajes', () => {
        it('debe rechazar mensajes vacíos', () => {
            expect(validateInput('')).toBe(false);
        });

        it('acepta mensajes con contenido válido', () => {
            expect(validateInput('¡Voy a ser el Rey de los Piratas!')).toBe(true);
        });

        it('rechaza mensajes que exceden 500 caracteres', () => {
            const messageLargo = 'a'.repeat(501);
            expect(validateInput(messageLargo)).toBe(false);
        });

        it('acepta mensajes en el límite de 499 caracteres', () => {
            const messageEnLimite = 'b'.repeat(499);
            expect(validateInput(messageEnLimite)).toBe(true);
        });

        it('rechaza mensajes que son solo espacios', () => {
            expect(validateInput('     ')).toBe(false);
        });
    });

    describe('getLuffyGreeting aka Saludo personalizado', () => {
        it('incluye el nombre proporcionado en el saludo', () => {
            const greeting = getLuffyGreeting('Zoro');
            expect(greeting).toContain('Zoro');
            expect(greeting).toContain('Luffy');
        });

        it('usa "nakama" como nombre por defecto', () => {
            const greeting = getLuffyGreeting();
            expect(greeting).toContain('nakama');
        });

        it('tiene un formato consistente', () => {
            const greeting = getLuffyGreeting('Sanji');
            expect(greeting).toMatch(/¡Hola, soy Luffy!/);
            expect(greeting).toMatch(/entrenado muy duro/);
        });

        it('funciona con nombres especiales de One Piece', () => {
            const greeting = getLuffyGreeting('Sombrero de Paja');
            expect(greeting).toContain('Sombrero de Paja');
        });
    });

    describe('parseApiResponse aka Procesamiento de respuestas', () => {
        it('extrae el texto de una respuesta válida', () => {
            const response = { text: '¡Voy a ser Rey de los Piratas!' };
            expect(parseApiResponse(response)).toBe('¡Voy a ser Rey de los Piratas!');
        });

        it('retorna mensaje de error para objeto vacío', () => {
            expect(parseApiResponse({})).toBe("¡Rayos! No pude entenderte, ¿puedes repetirlo?");
        });

        it('retorna mensaje de error para null', () => {
            expect(parseApiResponse(null)).toBe("¡Rayos! No pude entenderte, ¿puedes repetirlo?");
        });

        it('retorna mensaje de error para undefined', () => {
            expect(parseApiResponse(undefined)).toBe("¡Rayos! No pude entenderte, ¿puedes repetirlo?");
        });

        it('preserva el contenido incluso si es una pregunta', () => {
            const question = { text: '¿Cuál es tu sueño?' };
            expect(parseApiResponse(question)).toBe('¿Cuál es tu sueño?');
        });

        it('maneja respuestas con caracteres especiales', () => {
            const special = { text: '¡KAMEHAMEHA! ... espera, eso no es mío 😅' };
            expect(parseApiResponse(special)).toContain('¡KAMEHAMEHA!');
        });
    });
});
