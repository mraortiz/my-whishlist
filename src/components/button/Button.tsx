
import styles from './button.module.scss';
import type { ButtonProps } from '../../types';
import { buttonConfig } from './config';


const Button = ({ mode, isSelected, text, onClick }: ButtonProps) => {


    const config = buttonConfig[mode] || buttonConfig.add;

    const handleClick = () => {
        if (config.disabled) return; // Evita la acción si el botón está deshabilitado
        if (onClick) onClick();
    }

    return (
        <button
            className={`${config.className} ${mode === 'pill' && isSelected ? styles.selected : ''}`} // Agrega clase de activo si es un pill seleccionado
            onClick={handleClick}
            disabled={config.disabled}
        >
            {config.icon}
            {(text || config.text) && <span>{text || config.text}</span>}
        </button>
    );
};

export default Button;
