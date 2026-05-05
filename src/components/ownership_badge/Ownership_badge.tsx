import styles from './ownership_badge.module.scss';
import { Plus } from 'lucide-react';
import { Check } from 'lucide-react';

interface Props {
    owned: boolean;
    onClick: () => void;
}

const OwnershipBadge = ({ owned, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.badge} ${owned ? styles.owned : styles.wishlist}`}
            aria-label={owned ? "Quitar de colección" : "Mover a colección"}
        >
            <div className={styles.icon_wrapper}>
                {owned ? (
                    /* Icono de check o vinilo lleno */
                    <Check />
                ) : (
                    /* Icono de mas o circulo vacío */
                    <Plus size={16} />
                )}
            </div>
            <span className={styles.text}>
                {owned ? 'In Collection' : 'Add to Collection'}
            </span>
        </button>
    );
};

export default OwnershipBadge;