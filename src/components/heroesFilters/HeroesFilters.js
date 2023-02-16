import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFilters } from '../../actions';
import { useHttp } from './../../hooks/http.hook';
import { useState } from 'react';
import classNames from 'classnames';
import { activeFilterUpdate } from './../../actions/index';
import { createSelector } from 'reselect';


const HeroesFilters = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const dispatch = useDispatch();
    const {request} = useHttp();
    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(filters => dispatch(createFilters(filters)))
    }, [])


    const changeActiveFilter = (filter) => {
        setActiveFilter(filter);
        dispatch(activeFilterUpdate(filter));
    }

    const filters = useSelector(state => state.filters.filters);
    const createElementButtons = (filters) => {
        return filters.map(item => {
            let btnClasses = {
                "btn": true,
                "active": activeFilter === item
            };
            switch (item) {
                case "All": 
                    btnClasses["btn-outline-dark"] = true;
                    break;
                case "Fire":
                    btnClasses["btn-danger"] = true;
                    break;
                case "Water":
                    btnClasses["btn-primary"] = true;
                    break;
                case "Wind": 
                    btnClasses["btn-success"] = true;
                    break;
                case "Earth":  
                    btnClasses["btn-secondary"] = true;
                    break;   
                default: 
                    btnClasses["btn-outline-dark"] = true;
                    break;
            }
            return <button key={item} onClick={() => changeActiveFilter(item)} className={classNames(btnClasses)}>{item}</button>
        });
    }
    const elementButtons = createElementButtons(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter the heroes by elements</p>
                <div className="btn-group">
                    {elementButtons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;