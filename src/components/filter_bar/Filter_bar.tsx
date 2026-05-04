import { useUi } from '../../context/useUI';
import Button from '../button/Button';
import styles from './filter_bar.module.scss';

const Filter_bar = () => {
    const { isFilterBarOpen, genres, selectedGenre } = useUi();

    // Si no está abierto, no renderizamos nada (o manejamos la animación con clases)
    if (!isFilterBarOpen) return null;

    const genresList = ["All", ...new Set(genres.map(genre => genre))]; // Aseguramos que "All" esté al principio y eliminamos duplicados

    const isSelected = (genre: string) => {
        return selectedGenre === genre;
    };

    return (
        <div className={styles.filter_wrapper}>
            <div className={styles.scroll_container}>
                {genresList.map(genre => (
                    <Button key={genre} mode='pill' genre={genre} isSelected={isSelected(genre)} />
                ))}
            </div>
        </div>
    );
};

export default Filter_bar;