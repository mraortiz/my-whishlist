export type AlbumProps = {
    id: number,
    cover: string,
    genre: string,
    price: number,
    title: string,
    artist: string,
    owned: boolean
}

export type ButtonMode = 'menu' | 'add' | 'filter' | 'submit' | 'cancel' | 'pill' | 'edit' | 'delete' | 'home' | 'collection' | 'yes' | 'no' | 'edit_nav';

export type ButtonConfig = {
    icon?: React.ReactNode;
    text?: string | null;
    className?: string;
    disabled?: boolean;
    genre?: string;
    isSelected?: boolean;
}

export type ButtonProps = {
    mode: ButtonMode;
    genre?: string;
    onClick?: () => void;
    disabled?: boolean;   // Viene del componente que usa el botón (ej: de useUI)
    isSelected?: boolean; // Para las pills
    label?: string;       // Para el texto de las pills
    type?: "button" | "submit";
    text?: string;        // Para botones con texto específico (ej: submit, cancel)
}