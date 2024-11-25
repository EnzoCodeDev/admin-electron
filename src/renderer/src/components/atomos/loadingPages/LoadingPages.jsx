import './loadingPages.scss';
import React from 'react'
import configStore from '../../../store/configStore';

export const LoadingPages = () => {
    const configTienda = configStore((state) => state);
    return (
        <div className={"preloader " + (configTienda["theme"] === 'dark' ? 'dark' : 'ligth')}>
            <div className="loader"></div>
        </div>
    )
}