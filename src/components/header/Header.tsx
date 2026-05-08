import { useUi } from '../../context/useUI';
//import App_name from '../app_name/App_name'
import Search_bar from '../search_bar/Search_bar'
import FilterBar from '../filter_bar/Filter_bar';
import styles from './header.module.scss'

const Header = () => {
    const { isFilterBarOpen } = useUi();

    return (
        <div className={styles.header_container}>
            <p className={styles.app_name}>My collection</p>
            <Search_bar />
            {isFilterBarOpen && <FilterBar />}
        </div>
    )
}

export default Header
