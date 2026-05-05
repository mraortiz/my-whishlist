import styles from './edit_menu.module.scss'
import { SquarePen } from 'lucide-react';
import { Trash2 } from 'lucide-react';

const Edit_menu = () => {
    return (
        <div className={styles.edit_menu}>
            <SquarePen className={styles.edit} />
            <Trash2 className={styles.delete} />
        </div>
    )
}

export default Edit_menu
