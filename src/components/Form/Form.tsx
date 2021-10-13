import React, { FC, useEffect, useState } from 'react';
import { IUser } from '../../model/user';
import './Form.scss';


interface FormProps {
    user: IUser;
    onAddTag: (user: IUser, newTagName: string) => void;
}

const Form: FC<FormProps> = ({ user, onAddTag }) => {
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
            onAddTag(user, newTag)
        }
        setNewTag("");
    }

    useEffect(() => {
        setDisabled(user?.tags && user?.tags?.length >= 5 ? true : false);
    }, [user])

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
