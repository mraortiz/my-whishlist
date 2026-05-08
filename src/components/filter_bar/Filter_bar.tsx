import { useUi } from '../../context/useUI';
import Button from '../button/Button';
import styles from './filter_bar.module.scss';

const Filter_bar = () => {
    const { isFilterBarOpen, genres, selectedGenre, setSelectedGenre } = useUi();

    if (!isFilterBarOpen) return null;

    const genresList = ["All", ...new Set(genres.map(genre => genre))];

    const isSelectedPill = (genre: string) => {
        return selectedGenre.toLowerCase() === genre.toLowerCase();
    };

    console.log(genresList, "genresList");

    return (
        <div className={styles.filter_wrapper}>
            <div className={styles.scroll_container}>
                {genresList.map(genre => (
                    <Button key={genre} mode='pill' text={genre} isSelected={isSelectedPill(genre)} onClick={() => setSelectedGenre(genre || "All")} />
                ))}
            </div>
        </div>
    );
};

export default Filter_bar;