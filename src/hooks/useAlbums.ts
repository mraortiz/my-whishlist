import { useState } from 'react';
import { dbAddAlbum, dbUpdateAlbum, dbDeleteAlbum } from '../helpers/albumServices'; 
import type { AlbumProps } from '../types';

export const useAlbums = () => {
    const [albums, setAlbums] = useState<AlbumProps[]>([]);
    const [loading, setLoading] = useState(false);

    // 1. ADD: Primero guarda en Supabase, si sale bien, actualiza la UI
    const addAlbum = async (newAlbum: Omit<AlbumProps, 'id'>) => {
        setLoading(true);
        try {
            const savedAlbum = await dbAddAlbum(newAlbum); // Llama al helper de DB
            setAlbums((prev) => [savedAlbum, ...prev]);   // Actualiza el estado visual
            return savedAlbum;
        } catch (error) {
            console.error("Error al agregar disco:", error);
            throw error; // Re-lanzamos para que el formulario pueda mostrar un alert
        } finally {
            setLoading(false);
        }
    };

    // 2. UPDATE: Actualiza en Supabase y luego en la UI
    const updateAlbum = async (id: string | number, updatedFields: Partial<AlbumProps>) => {
        setLoading(true);
        try {
            const updatedAlbum = await dbUpdateAlbum(id, updatedFields); // Llama al helper de DB
            setAlbums((prev) =>
                prev.map((album) => (album.id === id ? updatedAlbum : album))
            );
            return updatedAlbum;
        } catch (error) {
            console.error("Error al actualizar disco:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // 3. DELETE: Borra en Supabase y luego lo saca de la UI
    const deleteAlbum = async (id: string | number) => {
        setLoading(true);
        try {
            await dbDeleteAlbum(id); // Llama al helper de DB
            setAlbums((prev) => prev.filter((album) => album.id !== id)); // Saca de la pantalla
        } catch (error) {
            console.error("Error al borrar disco:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        albums,
        setAlbums,
        loading,
        addAlbum,    // <--- Ahora tus componentes usan estas funciones conectadas
        updateAlbum,
        deleteAlbum
    };
};