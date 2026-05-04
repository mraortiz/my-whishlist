import { useContext } from 'react';
import UiContext from './UIContext';

export const useUi = () => {
    const context = useContext(UiContext);
    if (!context) {
        throw new Error('useUi must be used within a UiProvider');
    }
    return context;
};