
import Button from '../button/Button'
import styles from './navbar.module.scss'
import { useUi } from '../../context/useUI';

const Navbar = () => {

    const { toggleForm, setIsEditMode, isEditMode, currentView, setCurrentView } = useUi();

    const getClassName = (viewName: 'home' | 'collection' | 'add') => {
        return currentView === viewName && !isEditMode ? styles.active : '';
    };

    return (
        <ul className={styles.navbar_container}>
            <li className={getClassName('home')}>
                <Button mode='home' onClick={() => {
                    setIsEditMode(false);
                    setCurrentView('home');
                }} />
            </li>
            <li className={getClassName('collection')}>
                <Button mode='collection' onClick={() => {
                    setIsEditMode(false);
                    setCurrentView('collection');
                }} />
            </li>
            <li className={getClassName('add')}>
                <Button mode='add' onClick={() => {
                    setIsEditMode(false);
                    toggleForm();
                    setCurrentView('add');
                }} />
            </li>
            <li className={isEditMode ? styles.active : ''}>
                <Button mode='edit_nav' onClick={() => {
                    setIsEditMode(!isEditMode);
                }} />
            </li>
        </ul>
    )
}

export default Navbar
