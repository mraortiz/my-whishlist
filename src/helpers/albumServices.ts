import { supabase } from '../lib/supabase'; // Tu cliente de Supabase
import type { AlbumProps } from '../types';

// Subir la imagen al storage
export const uploadAlbumImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { error } = await supabase.storage
        .from('album-covers') // Tu bucket de Supabase
        .upload(filePath, file);

    if (error) {
        console.error('Error subiendo imagen:', error.message);
        return null;
    }

    const { data } = supabase.storage.from('album-covers').getPublicUrl(filePath);
    return data.publicUrl;
};

// Guardar un nuevo álbum
export const dbAddAlbum = async (newAlbum: Omit<AlbumProps, 'id'>): Promise<AlbumProps> => {
    const { data, error } = await supabase
        .from('albums')
        .insert([newAlbum])
        .select();

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error("No se devolvieron datos de la base de datos");
    
    return data[0];
};

// Actualizar un álbum existente
export const dbUpdateAlbum = async (id: string | number, updatedFields: Partial<AlbumProps>): Promise<AlbumProps> => {
    const { data, error } = await supabase
        .from('albums')
        .update(updatedFields)
        .eq('id', id)
        .select();

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error("No se pudo actualizar el registro");

    return data[0];
};

// Eliminar un álbum
export const dbDeleteAlbum = async (id: string | number): Promise<void> => {
    const { error } = await supabase
        .from('albums')
        .delete()
        .eq('id', id);

    if (error) throw new Error(error.message);
};