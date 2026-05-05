import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useUi } from '../../context/useUI';
import styles from './album.module.scss'
import OwnershipBadge from '../ownership_badge/Ownership_badge';
import { type AlbumProps } from '../../types'
import Edit_menu from '../../edit_menu/Edit_menu';



const Album = ({ cover, genre, price, title, artist, owned, id }: AlbumProps) => {

    const { setAlbums, setIsEditMode, isEditMode } = useUi();
    const [isExiting, setIsExiting] = useState(false);

    console.log("edit mode on?", isEditMode);

    const handleContextMenu = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault(); // Evita que aparezca el menú feo del navegador
        setIsEditMode(true);
        if (navigator.vibrate) navigator.vibrate(50);
    };

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
                <img src={cover} alt="album cover" className={styles.album_cover} />
            </div>
            {isEditMode ? <Edit_menu /> : (
                <>
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
                </>
            )}
        </div>
    )
}

export default Album
