import React, { FC } from 'react';
import { IUser } from '../../model/user';
import Form from '../Form/Form';
import Tag from '../Tag/Tag';
import './Card.scss';

interface CardProps {
    user: IUser;
    onAddTag: (user: IUser, newTagName: string) => void;
    onDeleteTag: (user: IUser, tagId: string) => void;
}

const Card: FC<CardProps> = ({ user, onAddTag, onDeleteTag }) => {
    return (
        <section className="card">
            <div className="card__caption">
                <h1>{user.name}</h1>
                <p>Date: {user.created_at}</p>
            </div>
            <div className="card__tags">
                {user?.tags?.map((tag, index) => (
                    <Tag key={index} user={user} tag={tag} onDelete={onDeleteTag}/>
                ))}
            </div>
            <div className="card__form">
                <Form user={user} onAddTag={onAddTag}/>
            </div>
        </section>
    );
}

export default Card;
