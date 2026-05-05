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
    listToRender: string;
    setListToRender: React.Dispatch<React.SetStateAction<string>>;
    isEditMode: boolean;
    exitEditMode: () => void;
    setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

interface UiProviderProps {
    children: ReactNode;
}

export const UiProvider = ({ children }: UiProviderProps) => {

    const [isEditMode, setIsEditMode] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
    const [albums, setAlbums] = useState<AlbumProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [genres, setGenres] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [listToRender, setListToRender] = useState("my whishlist");

    const toggleForm = () => setIsFormOpen(prev => !prev);
    const toggleFilterBar = () => setIsFilterBarOpen(prev => !prev);
    const exitEditMode = () => setIsEditMode(false);


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
    }, []);

    useEffect(() => {
        const channel = supabase
            .channel('cambios-en-discos')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'albums' },
                (payload) => {

                    if (payload.eventType === 'INSERT') {
                        setAlbums((prev) => [payload.new as AlbumProps, ...prev]);
                    }

                    if (payload.eventType === 'UPDATE') {
                        setAlbums((prev) =>
                            prev.map((album) =>
                                // Si es el disco que cambió, lo reemplazamos con la nueva info (payload.new)
                                album.id === payload.new.id ? (payload.new as AlbumProps) : album
                            )
                        );
                    }

                    if (payload.eventType === 'DELETE') {
                        setAlbums((prev) => prev.filter((album) => album.id !== payload.old.id));
                    }
                }
            )
            .subscribe();

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
            setLoading,
            listToRender,
            setListToRender,
            isEditMode,
            exitEditMode,
            setIsEditMode,
        }}>
            {children}
        </UiContext.Provider>
    );
};

export default UiContext;