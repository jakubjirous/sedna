import React, { FC } from 'react';
import { IMovie } from '../../model/movie';
import Form from '../Form/Form';
import Tag from '../Tag/Tag';
import './Card.scss';

interface CardProps {
    movie: IMovie;
    onAddTag: (movie: IMovie, newTagName: string) => void;
    onDeleteTag: (movie: IMovie, tagId: string) => void;
}

const Card: FC<CardProps> = ({ movie, onAddTag, onDeleteTag }) => {
    return (
        <section className="card">
            <div className="card__caption">
                <h1>{movie.name}</h1>
                <p>Date: {movie.created_at}</p>
            </div>
            <div className="card__tags">
                {movie?.tags?.map((tag, index) => (
                    <Tag key={index} movie={movie} tag={tag} onDelete={onDeleteTag}/>
                ))}
            </div>
            <div className="card__form">
                <Form movie={movie} onAddTag={onAddTag}/>
            </div>
        </section>
    );
}

export default Card;
