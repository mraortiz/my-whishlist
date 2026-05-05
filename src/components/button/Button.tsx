import { Plus, ListFilter, Check, X, Menu } from 'lucide-react';
import styles from './button.module.scss';
import { useUi } from '../../context/useUI';
import type { ButtonMode } from '../../types';

type ButtonConfig = {
    icon?: React.ReactNode;
    text?: string | null;
    className?: string;
    disabled?: boolean;
    genre?: string;
    isSelected?: boolean;
}

type ButtonProps = {
    mode: ButtonMode;
    genre?: string;
    isSelected?: boolean;
}


const Button = ({ mode, genre, isSelected }: ButtonProps) => {

    const { isFormOpen, toggleForm, toggleFilterBar, setSelectedGenre } = useUi(); // Se conecta a la señal


    const handleClick = () => {
        if (mode === 'add' || mode === 'cancel') {
            toggleForm();
        } else if (mode === 'filter') {
            toggleFilterBar();
        } else if (mode === 'pill') {
            setSelectedGenre(genre || "All");
        }
    };

    const buttonConfig: Record<ButtonMode, ButtonConfig> = {
        menu: {
            icon: <Menu size={18} />,
            text: null,
            className: styles.menu,
            disabled: isFormOpen, // Deshabilita el botón "Menu" si el formulario ya está abierto
        },
        add: {
            icon: <Plus size={18} />,
            text: "Add",
            className: styles.add,
            disabled: isFormOpen, // Deshabilita el botón "Add" si el formulario ya está abierto
        },
        filter: {
            icon: <ListFilter size={18} />,
            text: null, // El filtro suele ser solo el icono
            className: styles.filter,
            disabled: isFormOpen, // Deshabilita el botón "Add" si el formulario ya está abierto
        },
        submit: {
            icon: <Check size={18} />,
            text: "Submit",
            className: styles.submit,
            disabled: !isFormOpen, // Deshabilita el botón "Submit" si el formulario no está abierto
        },
        cancel: {
            icon: <X size={18} />,
            text: "Cancel",
            className: styles.cancel,
            disabled: !isFormOpen, // Deshabilita el botón "Cancel" si el formulario no está abierto
        },
        pill: {
            icon: null,
            text: genre,
            className: styles.pill,
            disabled: false, // Los botones de filtro nunca están deshabilitados
            isSelected: isSelected,
        }
    };

    const config = buttonConfig[mode] || buttonConfig.add;

    return (
        <button
            className={`${config.className} ${mode === 'pill' && config.isSelected ? styles.selected : ''}`} // Agrega clase de activo si es un pill seleccionado
            onClick={handleClick}
            disabled={config.disabled}
        >
            {config.icon}
            {config.text && <span>{config.text}</span>}
        </button>
    );
};

export default Button;
