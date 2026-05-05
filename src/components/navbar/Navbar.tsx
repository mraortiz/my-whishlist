import { useUi } from '../../context/useUI'
import styles from './navbar.module.scss'

const Navbar = () => {

    const { setListToRender } = useUi()

    return (
        <div className={styles.navbar_container}>
            <span onClick={() => setListToRender("my whishlist")}>My whishlist</span>
            <span onClick={() => setListToRender("my collection")}>My collection</span>
        </div>
    )
}

export default Navbar
