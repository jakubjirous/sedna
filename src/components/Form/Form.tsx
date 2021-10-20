import React, { FC, useEffect, useState } from 'react';
import { IMovie } from '../../model/movie';
import './Form.scss';

interface FormProps {
    movie: IMovie;
    onAddTag: (movie: IMovie, newTagName: string) => void;
}

const Form: FC<FormProps> = ({ movie, onAddTag }) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const [newTag, setNewTag] = useState<string>("");

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTag(event.target.value)
    }

    const addHandler = () => {
        if (newTag) {
            onAddTag(movie, newTag)
        }
        setNewTag("");
    }

    useEffect(() => {
        setDisabled(movie?.tags && movie?.tags?.length >= 5 ? true : false);
    }, [movie])

    return (
        <form className="form" onSubmit={submitHandler}>
            <input
                type="text"
                placeholder="Placeholder"
                className="form__input"
                disabled={disabled}
                value={newTag}
                onChange={changeHandler}
            />
            <button className={`button form__button ${disabled ? "disabled" : ""}`} disabled={disabled}
                    onClick={addHandler}>
                Add Tag
            </button>
        </form>
    );
}

export default Form;
