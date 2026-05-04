import React, { useState } from 'react'
import Button from '../button/Button'
import styles from './album_form.module.scss'
import { useUi } from '../../context/useUI';
import { uploadAlbumImage } from '../../helpers/upload_image';
import { supabase } from '../../lib/supabase';


const Album_form = () => {
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        genre: '',
        price: '',
        cover: 'https://placehold.co/300x300/1a1a1c/949499?text=New+Vinyl' // Placeholder por defecto
    });

    const [file, setFile] = useState<File | null>(null);

    const { setAlbums, setLoading, albums } = useUi();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = '';

        // 1. Si hay un archivo seleccionado, primero lo subimos
        if (file) {
            const uploadedUrl = await uploadAlbumImage(file);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            }
        }

        const { data, error } = await supabase
            .from('albums')
            .insert([{ ...formData, cover: imageUrl }])
            .select(); // IMPORTANTE: Agregamos .select() para que nos devuelva el objeto creado

        if (!error && data) {
            // Aquí llamás a la función que actualiza tu lista localmente
            // data[0] contiene el nuevo álbum con el ID que le puso Supabase
            setAlbums([data[0], ...albums]);

            // O si usas un context:
            // updateAlbums(data[0]);

            alert("¡Disco guardado!");
        }


        setLoading(false);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.input_group}>
                <label htmlFor="title">Album Title</label>
                <input type="text" name="title" id="title" placeholder="e.g. Ace of Spades" onChange={handleChange} />
            </div>

            <div className={styles.input_group}>
                <label htmlFor="artist">Artist</label>
                <input type="text" name="artist" id="artist" placeholder="e.g. Motörhead" onChange={handleChange} />
            </div>

            <div className={styles.input_group}>
                <label htmlFor="genre">Genre</label>
                <input type="text" name="genre" id="genre" placeholder="e.g. Speed Metal" onChange={handleChange} />
            </div>

            <div className={styles.input_group}>
                <label htmlFor="price">Price (USD)</label>
                <input type="number" name="price" id="price" placeholder="0.00" step="0.01" onChange={handleChange} />
            </div>

            <div className={styles.input_group}>
                <label htmlFor="cover">Album Cover</label>
                <input type="file" name="cover" id="cover"
                    onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </div>

            <div className={styles.button_container}>
                <Button mode="cancel" />
                <Button mode="submit" />
            </div>
        </form>
    )
}

export default Album_form
