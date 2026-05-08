import { useState } from 'react';
import styles from './edit_menu.module.scss'
import Button from '../button/Button';
import { useUi } from '../../context/useUI';
import { useAlbums } from '../../hooks/useAlbums';
import type { AlbumProps } from '../../types';

interface EditMenuProps {
    album: AlbumProps;
}

const Edit_menu = ({ album }: EditMenuProps) => {
    const { toggleForm, setEditingAlbum, setIsEditMode } = useUi();
    const { deleteAlbum } = useAlbums();
    const [confirmingDelete, setConfirmingDelete] = useState(false);

    const handleEdit = () => {
        setEditingAlbum(album);
        toggleForm();
        setIsEditMode(false);
    };

    const handleDelete = async () => {
        if (!confirmingDelete) {
            setConfirmingDelete(true); // First tap: show confirm buttons
            return;
        }
        try {
            await deleteAlbum(album.id);
            alert("Se elimino el disco: " + album.title);
            setIsEditMode(false);
        } catch (err) {
            const error = err instanceof Error ? err : new Error(String(err));
            alert("No se pudo eliminar el disco: " + error.message);
        }
    };

    return (
        <div className={styles.edit_menu}>
            {confirmingDelete ? (
                <>
                    <Button mode="yes" onClick={handleDelete} text='Yes' />
                    <Button mode="no" onClick={() => setConfirmingDelete(false)} text='No' />
                </>
            ) : (
                <>
                    <Button mode="edit" onClick={handleEdit} text='Edit' />
                    <Button mode="delete" onClick={() => setConfirmingDelete(true)} />
                </>
            )}
        </div>
    );
}

export default Edit_menu;