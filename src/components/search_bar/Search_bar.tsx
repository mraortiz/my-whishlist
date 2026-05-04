import Button from '../button/Button'
import styles from './Search_bar.module.scss'
import { Search } from 'lucide-react'

const Search_bar = () => {


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
            <Button mode="filter" />
        </div>
    )
}

export default Search_bar
