import axios from 'axios';

// Acessando variáveis de ambiente no Vite
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
    baseURL: baseURL || "http://localhost:3333/"  // Fallback para localhost se a variável não estiver definida
});
