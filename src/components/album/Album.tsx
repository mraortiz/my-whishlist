import styles from './album.module.scss'
import ace_of_spades from '../../assets/ace_of_spades.jpg'
import { type AlbumProps } from '../../types'
import { supabase } from '../../lib/supabase';
import OwnershipBadge from '../ownership_badge/Ownership_badge';
import { useEffect, useState } from 'react';
import { useUi } from '../../context/useUI';



const Album = ({ cover, genre, price, title, artist, owned, id }: AlbumProps) => {

    const { setAlbums, setIsEditMode, isEditMode } = useUi();

    const [isExiting, setIsExiting] = useState(false);

    const handleContextMenu = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // Evita que aparezca el menú feo del navegador
        setIsEditMode(true);
        if (navigator.vibrate) navigator.vibrate(50);
    };

    useEffect(() => {
        if (isEditMode) {
            alert("Edit mode activated! Ahora podrías mostrar opciones para editar o eliminar este álbum.");
        }
    }, [isEditMode]);

    const handleToggle = async () => {
        // 1. Iniciamos la animación de salida local
        setIsExiting(true);

        // 2. Esperamos a que la animación termine (ej. 400ms) antes de actualizar la DB y el estado global
        setTimeout(async () => {
            const nextStatus = !owned;

            const { error } = await supabase
                .from('albums')
                .update({ owned: nextStatus })
                .eq('id', id);

            if (!error) {
                setAlbums(prev =>
                    prev.map(a => a.id === id ? { ...a, owned: nextStatus } : a)
                );
            }
            // Resetear el estado de salida por si volvemos a ver esta card
            setIsExiting(false);
        }, 400);
    };

    return (
        <div className={styles.album_container} onContextMenu={handleContextMenu} onTouchStart={handleContextMenu}>
            <div className={styles.cover_container}>
                <img src={cover || ace_of_spades} alt="album cover" className={styles.album_cover} />
            </div>
            <div className={styles.album_data}>
                <div className={styles.info}>
                    <span className={styles.tags}>{genre}</span>
                    <span className={styles.dot}>•</span>
                    <span className={styles.price}>u$d {price}</span>
                </div>
                <span className={styles.album_name}>{title}</span>
                <span className={styles.artist_name}>{artist}</span>
            </div>
            <div className={`${styles.card} ${isExiting ? styles.fadeOut : ''}`}>
                {/* ... info del album ... */}
                <div className={styles.footer}>
                    <OwnershipBadge owned={owned} onClick={handleToggle} />
                </div>
            </div>
        </div>
    )
}

export default Album
