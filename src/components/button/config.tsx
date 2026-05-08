import { Plus, ListFilter, Check, X, Menu, SquarePen, Trash2, House, Disc3 } from 'lucide-react';
import type { ButtonConfig, ButtonMode, } from '../../types';
import styles from './button.module.scss';

export const buttonConfig: Record<ButtonMode, ButtonConfig> = {
    home: {
        icon: <House size={18} />,
        text: "Home",
        className: styles.home,
    },
    collection: {
        icon: <Disc3 size={18} />,
        text: "Collection",
        className: styles.collection,
    },
    menu: {
        icon: <Menu size={18} />,
        text: null,
        className: styles.menu,
    },
    add: {
        icon: <Plus size={18} />,
        text: "Add",
        className: styles.add,
    },
    filter: {
        icon: <ListFilter size={18} />,
        text: null, // El filtro suele ser solo el icono
        className: styles.filter,
    },
    submit: {
        icon: <Check size={18} />,
        text: "Submit",
        className: styles.submit,
    },
    cancel: {
        icon: <X size={18} />,
        text: "Cancel",
        className: styles.cancel,
    },
    pill: {
        icon: null,
        className: styles.pill,
    },
    edit: {
        icon: <SquarePen size={18} />,
        text: "Edit",
        className: styles.edit,
    },
    edit_nav: {
        icon: <SquarePen size={18} />,
        text: "Edit",
        className: styles.edit_nav,
    },
    delete: {
        icon: <Trash2 size={18} />,
        text: "Delete",
        className: styles.delete,
    },
    yes: {
        icon: <Check size={18} />,
        text: "Yes",
        className: styles.yes,
    },
    no: {
        icon: <X size={18} />,
        text: "No",
        className: styles.no,
    }
};