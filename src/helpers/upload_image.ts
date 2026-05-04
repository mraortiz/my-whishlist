import { supabase } from "../lib/supabase";

export const uploadAlbumImage = async (file: File) => {
  try {
    // 1. Creamos un nombre único para el archivo (evita colisiones)
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // 2. Subimos el archivo al bucket 'album-covers'
    const { data, error } = await supabase.storage
      .from('album-covers')
      .upload(filePath, file);

    if (error) throw error;

    // 3. Obtenemos la URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('album-covers')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error subiendo imagen:', error);
    return null;
  }
};