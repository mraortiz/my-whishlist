import Album from '../album/Album'
import type { JSX } from 'react/jsx-runtime';
import type { AlbumProps } from '../../types';
import { useUi } from '../../context/useUI';


const List = () => {
    const { albums } = useUi(); // Traemos los discos del contexto

    return (
        <ul>
            {albums?.map((album: JSX.IntrinsicAttributes & AlbumProps) => (
                <li key={album.id}>
                    <Album {...album} />
                </li>
            ))}
        </ul>
    )
}

export default List
