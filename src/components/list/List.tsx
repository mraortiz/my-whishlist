import Album from '../album/Album'
import type { JSX } from 'react/jsx-runtime';
import type { AlbumProps } from '../../types';
import { useUi } from '../../context/useUI';


const List = () => {
    const { albums, listToRender } = useUi(); // Traemos los discos del contexto

    const renderAlbums = albums.filter(album => {
        if (listToRender === "my whishlist") {
            return album.owned === false; // Filtra solo los discos que están en la wishlist
        } else {
            return album.owned === true; // Filtra solo los discos que no están en la wishlist (colección)
        }
    });


    return (
        <ul>
            {renderAlbums?.map((album: JSX.IntrinsicAttributes & AlbumProps) => (
                <li key={album.id}>
                    <Album {...album} />
                </li>
            ))}
        </ul>
    )
}

export default List
