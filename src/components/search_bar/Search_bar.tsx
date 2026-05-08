import { useUi } from '../../context/useUI';
import Button from '../button/Button'
import styles from './Search_bar.module.scss'
import { Search } from 'lucide-react'

const Search_bar = () => {

    const { toggleFilterBar } = useUi();


    return (
        <div className={styles['search-container']}>
            <div className={styles['input-container']}>
                <Search size={18} className={styles.icon} />
                <input
                    type="text"
                    placeholder="Buscar"
                    className={styles.input}
                />
            </div>
            <Button mode="filter" onClick={toggleFilterBar} />
        </div>
    )
}

export default Search_bar
