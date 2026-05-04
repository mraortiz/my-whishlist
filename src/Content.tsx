import React from 'react'
import Header from './components/header/Header'
import List from './components/list/List'
import Album_form from './components/album_form/Album_form'
import { useUi } from './context/useUI'
import styles from './content.module.scss'

const Content = () => {
    const { isFormOpen } = useUi();

    return (
        <div className={styles.app_wrapper}>
            <Header />
            <main>
                <List />
            </main>
            {isFormOpen && (
                <div className={styles.overlay}>
                    <Album_form />
                </div>
            )}
        </div>
    )
}

export default Content
