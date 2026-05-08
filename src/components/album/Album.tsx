import { useUi } from '../../context/useUI';
import styles from './album.module.scss'
import { type AlbumProps } from '../../types'
import Edit_menu from '../edit_menu/Edit_menu';



const Album = ({ id, cover, genre, price, title, artist, owned }: AlbumProps) => {

    const { isEditMode } = useUi();

    return (
        <div className={styles.album_container}>
            <div className={styles.album_data}>
                <div className={styles.album_cover}>
                    <img src={cover} alt="album cover" className={styles.album_cover} />
                </div>
                {isEditMode ? (
                    <Edit_menu album={{ id, cover, genre, price, title, artist, owned }} />
                ) : (
                    <div className={styles.album_details}>
                        <div className={styles.info}>
                            <span className={styles.tags}>{genre}</span>
                            <span className={styles.dot}>•</span>
                            <span className={styles.price}>u$d {price}</span>
                        </div>
                        <span className={styles.album_name}>{title}</span>
                        <span className={styles.artist_name}>{artist}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Album
