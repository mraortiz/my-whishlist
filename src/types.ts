export type AlbumProps = {
    id: number,
    cover: string,
    genre: string,
    price: number,
    title: string,
    artist: string
}

export type ButtonMode = 'add' | 'filter' | 'submit' | 'cancel' | 'pill';