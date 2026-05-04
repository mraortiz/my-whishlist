import { createContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../lib/supabase'; // Tu clien
import type { AlbumProps } from '../types';

interface UiContextType {
    isFormOpen: boolean;
    toggleForm: () => void;
    albums: AlbumProps[];
    setAlbums: React.Dispatch<React.SetStateAction<AlbumProps[]>>;
    addAlbum: (newAlbum: AlbumProps) => void;
    selectedGenre: string;
    setSelectedGenre: React.Dispatch<React.SetStateAction<string>>;
    isFilterBarOpen: boolean;
    setIsFilterBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleFilterBar: () => void;
    genres: string[];
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

interface UiProviderProps {
    children: ReactNode;
}

export const UiProvider = ({ children }: UiProviderProps) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [albums, setAlbums] = useState<AlbumProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleForm = () => setIsFormOpen(prev => !prev);
    const toggleFilterBar = () => setIsFilterBarOpen(prev => !prev);

    console.log(loading)

    useEffect(() => {
        const fetchAlbums = async () => {
            const { data, error } = await supabase
                .from('albums')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                console.error('Error:', error.message);
            } else {
                setAlbums(data || []);
                setGenres(Array.from(new Set(data?.map(album => album.genre).filter(Boolean))) || []);
            }
            setLoading(false);
        };

        fetchAlbums();

        // 2. Suscripción en tiempo real
        const channel = supabase
            .channel('cambios-en-discos') // un nombre cualquiera para el canal
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'albums' },
                (payload) => {
                    // payload.new tiene el disco que acabas de agregar desde el otro dispositivo
                    setAlbums((currentAlbums) => [payload.new as AlbumProps, ...currentAlbums]);
                }
            )
            .subscribe();

        // 3. Limpieza al desmontar el componente
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);


    const addAlbum = async (newAlbum: Omit<AlbumProps, 'id'>) => {
        const { data, error } = await supabase
            .from('albums')
            .insert([newAlbum])
            .select(); // El .select() es clave para que nos devuelva el registro con su ID real

        if (error) {
            alert('Error al guardar: ' + error.message);
        } else if (data) {
            // Actualizamos el estado local agregando el nuevo disco al principio
            setAlbums((prev) => [data[0], ...prev]);
            setIsFormOpen(false);
        }
    };

    const filteredAlbums = albums.filter(album => album.genre === selectedGenre || selectedGenre === "All");

    return (
        <UiContext.Provider value={{
            isFormOpen,
            toggleForm,
            albums: filteredAlbums,
            setAlbums,
            addAlbum,
            selectedGenre,
            setSelectedGenre,
            isFilterBarOpen,
            setIsFilterBarOpen,
            toggleFilterBar,
            genres,
            loading,
            setLoading
        }}>
            {children}
        </UiContext.Provider>
    );
};

export default UiContext;