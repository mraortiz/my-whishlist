import React, { useState } from 'react'
import Button from '../button/Button'
import styles from './album_form.module.scss'
import { useUi } from '../../context/useUI';


const Album_form = () => {
    const [formData, setFormData] = useState({
        id: 0,
        title: '',
        artist: '',
        genre: '',
        price: '',
        cover: 'https://placehold.co/300x300/1a1a1c/949499?text=New+Vinyl' // Placeholder por defecto
    });
    const { addAlbum } = useUi();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validación básica
        if (!formData.title || !formData.artist) return alert("Title and Artist are required!");

        addAlbum({
            ...formData,
            price: Number(formData.price) // Convertimos el string a número
        });
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

            <div className={styles.button_container}>
                <Button mode="cancel" />
                <Button mode="submit" />
            </div>
        </form>
    )
}

export default Album_form
