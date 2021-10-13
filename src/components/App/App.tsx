import axios, { AxiosError } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import config from '../../config/config';
import { LocalStorage } from '../../model/localStorage';
import { IServerError } from '../../model/serverError';
import { ITag } from '../../model/tag';
import { IUser } from '../../model/user';
import Card from '../Card/Card';
import Filter from '../Filter/Filter';
import Loading from '../Loading/Loading';
import './App.scss';

const App: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<IServerError>();
    const [users, setUsers] = useState<IUser[]>([]);

    const [filterTerm, setFilterTerm] = useState<string>();
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);

    useEffect(() => {
        setLoading(true);

        if (localStorage.getItem(LocalStorage.USERS)) {
            const loadedUsers = JSON.parse(localStorage.getItem(LocalStorage.USERS) as string);
            setUsers(loadedUsers);
            setLoading(false);
        } else {
            axios.get<IUser[]>(`${config.api.baseUrl}/movies.json?key=bf3c1c60`)
                .then((response) => {
                    setUsers(response.data);
                })
                .catch((error) => {
                    if (axios.isAxiosError(error)) {
                        const serverError = error as AxiosError<IServerError>;
                        if (serverError && serverError.response) {
                            setError(serverError.response.data)
                        }
                    }
                    setError({ errorMessage: "Server error" });
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem(LocalStorage.USERS, JSON.stringify(users));
        }
    }, [users])

    useEffect(() => {
        if (filterTerm) {
            const filteredUsers = users
                ?.filter(user => user?.tags?.find(tag => tag?.name?.toLowerCase().includes(filterTerm?.toLowerCase())))
            setFilteredUsers(filteredUsers);
        }
    }, [filterTerm])

    const filterHandler = (newFilterTerm: string) => {
        setFilterTerm(newFilterTerm)
    }

    const addTagHandler = (user: IUser, newTagName: string) => {
        const newTag: ITag = {
            id: Date.now().toString(), // datetime as unique identifier
            name: newTagName
        }
        setUsers(prevUsers => prevUsers?.map(prevUser => prevUser?.id === user?.id
            ? {
                ...prevUser,
                tags: prevUser?.tags
                    ? [...prevUser?.tags, newTag]
                    : [newTag]
            }
            : prevUser
        ))
    }

    const deleteTagHandler = (user: IUser, tagId: string) => {
        setUsers(prevUsers => prevUsers?.map(prevUser => prevUser?.id === user?.id
            ? {
                ...prevUser,
                tags: prevUser?.tags?.filter(tag => tag?.id !== tagId)
            }
            : prevUser
        ))
    }

    return (
        <main className="main">
            {loading ? (
                <Loading/>
            ) : (
                <>
                    <Filter onFilter={filterHandler}/>

                    <div className="card__box">
                        {filterTerm ? (
                            <>
                                {filteredUsers?.length > 0 ? (
                                    <>
                                        {filteredUsers
                                            ?.map((user, index) => (
                                                <Card key={index} user={user} onAddTag={addTagHandler}
                                                      onDeleteTag={deleteTagHandler}/>
                                            ))}
                                    </>
                                ) : (
                                    <div className="card__empty">
                                        <p>There is no result with the tag you are looking for.</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {users
                                    ?.map((user, index) => (
                                        <Card key={index} user={user} onAddTag={addTagHandler}
                                              onDeleteTag={deleteTagHandler}/>
                                    ))}
                            </>
                        )}
                    </div>
                </>
            )}
        </main>
    );
}

export default App;
