import axios, { AxiosError } from 'axios';
import React, { FC, useEffect, useState } from 'react';
import config from '../../config/config';
import { LocalStorage } from '../../model/localStorage';
import { IMovie } from '../../model/movie';
import { IServerError } from '../../model/serverError';
import { ITag } from '../../model/tag';
import Card from '../Card/Card';
import Filter from '../Filter/Filter';
import Loading from '../Loading/Loading';
import './App.scss';

const App: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<IServerError>();
    const [movies, setMovies] = useState<IMovie[]>([]);

    const [filterTerm, setFilterTerm] = useState<string>();
    const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        setLoading(true);

        if (localStorage.getItem(LocalStorage.MOVIES)) {
            const loadedMovies = JSON.parse(localStorage.getItem(LocalStorage.MOVIES) as string);
            setMovies(loadedMovies);
            setLoading(false);
        } else {
            axios.get<IMovie[]>(`${config.api.baseUrl}/movies.json?key=bf3c1c60`)
                .then((response) => {
                    setMovies(response.data);
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
        if (movies.length > 0) {
            localStorage.setItem(LocalStorage.MOVIES, JSON.stringify(movies));
        }
    }, [movies])

    useEffect(() => {
        if (filterTerm) {
            const filteredMovies = movies
                ?.filter(movie => movie?.tags?.find(tag => tag?.name?.toLowerCase().includes(filterTerm?.toLowerCase())))
            setFilteredMovies(filteredMovies);
        }
    }, [filterTerm])

    const filterHandler = (newFilterTerm: string) => {
        setFilterTerm(newFilterTerm)
    }

    const addTagHandler = (movie: IMovie, newTagName: string) => {
        const newTag: ITag = {
            id: Date.now().toString(), // datetime as unique identifier
            name: newTagName
        }
        setMovies(prevMovies => prevMovies?.map(prevMovie => prevMovie?.id === movie?.id
            ? {
                ...prevMovie,
                tags: prevMovie?.tags
                    ? [...prevMovie?.tags, newTag]
                    : [newTag]
            }
            : prevMovie
        ))
    }

    const deleteTagHandler = (movie: IMovie, tagId: string) => {
        setMovies(prevMovies => prevMovies?.map(prevMovie => prevMovie?.id === movie?.id
            ? {
                ...prevMovie,
                tags: prevMovie?.tags?.filter(tag => tag?.id !== tagId)
            }
            : prevMovie
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
                                {filteredMovies?.length > 0 ? (
                                    <>
                                        {filteredMovies
                                            ?.map((movie, index) => (
                                                <Card key={index} movie={movie} onAddTag={addTagHandler}
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
                                {movies
                                    ?.map((movie, index) => (
                                        <Card key={index} movie={movie} onAddTag={addTagHandler}
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
