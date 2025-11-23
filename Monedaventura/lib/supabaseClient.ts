
import { createClient } from '@supabase/supabase-js';

// Cast import.meta to any to avoid TypeScript errors with Vite env vars
const metaEnv = (import.meta as any).env;

// ---------------------------------------------------------------------------
// CONFIGURACIÓN DE SUPABASE
// ---------------------------------------------------------------------------
// IMPORTANTE: Reemplaza estos valores con los de tu proyecto en Supabase.com
// Ve a: Project Settings -> API
// ---------------------------------------------------------------------------

// Usamos valores "placeholder" válidos sintácticamente para que la app no se rompa al iniciar si faltan las keys
const DEFAULT_URL = 'https://tu-proyecto.supabase.co'; 
const DEFAULT_KEY = 'tu-anon-key-aqui';

// Intentamos leer del archivo .env, si no existe, usamos los valores por defecto
const SUPABASE_URL = metaEnv?.VITE_SUPABASE_URL || DEFAULT_URL;
const SUPABASE_ANON_KEY = metaEnv?.VITE_SUPABASE_ANON_KEY || DEFAULT_KEY;

// Validación básica para evitar errores críticos de "Invalid URL"
const isValidUrl = (url: string) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

// Si la URL del entorno es inválida, usamos el placeholder.
const finalUrl = isValidUrl(SUPABASE_URL) ? SUPABASE_URL : DEFAULT_URL;

// Flag to check if we are running with placeholder credentials
export const isConfigured = finalUrl !== DEFAULT_URL && SUPABASE_ANON_KEY !== DEFAULT_KEY;

// Creamos el cliente. Si las credenciales son incorrectas, las llamadas a la BD fallarán, 
// pero la app cargará la interfaz (Landing Page).
export const supabase = createClient(finalUrl, SUPABASE_ANON_KEY);
