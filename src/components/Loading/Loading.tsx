import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import './Loading.scss';

const Loading: FC = () => {
    return (
        <div className="loading">
            <FontAwesomeIcon icon={faCircleNotch} className="loading__icon" size="3x"/>
        </div>
    );
}

export default Loading;
