import styles from './album.module.scss'
import ace_of_spades from '../../assets/ace_of_spades.jpg'
import { type AlbumProps } from '../../types'



const Album = ({ cover, genre, price, title, artist }: AlbumProps) => {
    return (
        <div className={styles.album_container}>
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
        </div>
    )
}

export default Album
