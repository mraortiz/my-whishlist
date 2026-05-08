import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import styles from './album_form.module.scss'
import { useUi } from '../../context/useUI';
// 1. Importamos el hook unificado de álbumes
import { useAlbums } from '../../hooks/useAlbums'; // <-- Ajustá esta ruta a donde guardaste useAlbums.ts
import { uploadAlbumImage } from '../../helpers/albumServices'; // Solo nos quedamos con el de subir fotos

const Album_form = () => {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        genre: '',
        price: ('' as unknown as number),
        cover: 'https://placehold.co/300x300/1a1a1c/949499?text=New+Vinyl' // Placeholder por defecto
    });

    const [file, setFile] = useState<File | null>(null);

    // uiContext maneja lo estético y el estado del modal
    const { setLoading, toggleForm, editingAlbum, setEditingAlbum } = useUi();

    // useAlbums maneja TODA la lógica de datos (BD + Reactividad)
    const { addAlbum, updateAlbum } = useAlbums();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Sincronizar el formulario con el álbum a editar
    useEffect(() => {
        if (editingAlbum) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                title: editingAlbum.title,
                artist: editingAlbum.artist,
                genre: editingAlbum.genre,
                price: editingAlbum.price,
                cover: editingAlbum.cover
            });
        } else {
            setFormData({
                title: '',
                artist: '',
                genre: '',
                price: ('' as unknown as number),
                cover: 'https://placehold.co/300x300/1a1a1c/949499?text=New+Vinyl'
            });
        }
    }, [editingAlbum]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = editingAlbum?.cover || formData.cover;

            // 1. Si hay un archivo seleccionado, lo subimos
            if (file) {
                const uploadedUrl = await uploadAlbumImage(file);
                if (uploadedUrl) imageUrl = uploadedUrl;
            }

            const finalAlbumData = {
                ...formData,
                owned: editingAlbum ? editingAlbum.owned : false, // Si es edición, mantenemos el estado de "owned"
                title: formData.title.toLowerCase(),
                artist: formData.artist.toLowerCase(),
                genre: formData.genre.toLowerCase(),
                cover: imageUrl
            };

            if (editingAlbum) {
                // MODO EDICIÓN
                // 2. El hook hace el update en Supabase y actualiza la UI global por nosotros
                await updateAlbum(editingAlbum.id, finalAlbumData);
                setEditingAlbum(null); // Reseteamos el estado de edición en el UI
                alert("¡Disco actualizado con éxito!");
            } else {
                // MODO AGREGAR
                // 2. El hook inserta en Supabase y mete el disco al principio de la UI global
                await addAlbum(finalAlbumData);
                alert("¡Disco guardado con éxito!");
            }

            toggleForm(); // Cerramos el formulario
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            alert('Hubo un error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>{editingAlbum ? 'Edit Album' : 'Add New Album'}</h2>

            <div className={styles.input_group}>
                <label htmlFor="title">Album Title</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={formData.title}
                    placeholder="e.g. Ace of Spades"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.input_group}>
                <label htmlFor="artist">Artist</label>
                <input
                    type="text"
                    name="artist"
                    id="artist"
                    value={formData.artist}
                    placeholder="e.g. Motörhead"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.input_group}>
                <label htmlFor="genre">Genre</label>
                <input
                    type="text"
                    name="genre"
                    id="genre"
                    value={formData.genre}
                    placeholder="e.g. Speed Metal"
                    onChange={handleChange}
                />
            </div>

            <div className={styles.input_group}>
                <label htmlFor="price">Price (USD)</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    value={formData.price || ''}
                    placeholder="0.00"
                    step="0.01"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className={styles.input_group}>
                <label htmlFor="cover">Album Cover</label>
                <input
                    type="file"
                    name="cover"
                    id="cover"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
            </div>

            <div className={styles.button_container}>
                <Button mode="cancel" type="button" onClick={() => {
                    setEditingAlbum(null);
                    toggleForm();
                }} />
                <Button mode="submit" type="submit" />
            </div>
        </form>
    )
}

export default Album_form;