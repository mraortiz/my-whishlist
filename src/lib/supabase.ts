import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('Supabase Key:', supabaseKey); // Verifica que la clave se esté leyendo correctamente

export const supabase = createClient(supabaseUrl, supabaseKey);