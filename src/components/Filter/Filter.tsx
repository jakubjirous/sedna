import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC } from 'react';
import './Filter.scss';

interface FilterProps {
    onFilter: (newFilterTerm: string) => void
}

const Filter: FC<FilterProps> = ({ onFilter }) => {

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
    }

    const filterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onFilter(event.target.value);
    }

    return (
        <form className="filter" onSubmit={submitHandler}>
            <div className="filter__control">
                <input
                    type="text"
                    placeholder="Search Tags"
                    className="filter__input"
                    onChange={filterHandler}
                />
                <FontAwesomeIcon icon={faSearch} className="filter__icon"/>
            </div>
        </form>
    );
}

export default Filter;
