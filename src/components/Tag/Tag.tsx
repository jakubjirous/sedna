import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import { ITag } from '../../model/tag';
import { IMovie } from '../../model/movie';
import './Tag.scss';

interface TagProps {
    movie: IMovie,
    tag: ITag,
    onDelete: (movie: IMovie, tagId: string) => void;
}

const Tag: FC<TagProps> = ({ movie, tag, onDelete }) => {

    const clickHandler = () => {
        onDelete(movie, tag.id);
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
