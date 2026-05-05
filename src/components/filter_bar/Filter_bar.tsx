import { useUi } from '../../context/useUI';
import Button from '../button/Button';
import styles from './filter_bar.module.scss';

const Filter_bar = () => {
    const { isFilterBarOpen, genres, selectedGenre } = useUi();

    if (!isFilterBarOpen) return null;

    const genresList = ["All", ...new Set(genres.map(genre => genre))];

    const isSelected = (genre: string) => {
        return selectedGenre.toLowerCase() === genre.toLowerCase();
    };

    console.log(genresList, "genresList");

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