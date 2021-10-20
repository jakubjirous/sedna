import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { ITag } from '../../model/tag';
import { IUser } from '../../model/user';
import './Tag.scss';

interface TagProps {
    user: IUser,
    tag: ITag,
    onDelete: (user: IUser, tagId: string) => void;
}

const Tag: FC<TagProps> = ({ user, tag, onDelete }) => {

    const clickHandler = () => {
        onDelete(user, tag.id);
    }

    return (
        <div className="tag">
            <p>
                {tag.name}
            </p>
            <button onClick={clickHandler} className="tag__button">
                <FontAwesomeIcon icon={faTimes} className="tag__icon"/>
            </button>
        </div>
    );
}

export default Tag;
