export type AlbumProps = {
    id: number,
    cover: string,
    genre: string,
    price: number,
    title: string,
    artist: string,
    owned: boolean
}

export type ButtonMode = 'menu' | 'add' | 'filter' | 'submit' | 'cancel' | 'pill';