import './headerPage.scss';
import React from 'react';
import ArowBackIcon from '@rsuite/icons/ArowBack';

export const HeaderPage = ({ title, onClickBack }) => {
    return (
        <div className='container-header-page'>
            {onClickBack && (
                <div className='container-icon' onClick={onClickBack}>
                    <ArowBackIcon className='icon' />
                </div>
            )}
            <div className='container-title'>
                <h3>{title}</h3>
            </div>
        </div>
    )
}