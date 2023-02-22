import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { fetchHeroes, selectAll } from './heroesSlice';
import store from './../../store/index';

const HeroesList = () => {
    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const filter = useSelector(state => state.filters.activeFilter);


    useEffect(() => {
        console.log(store.getState());
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        if (filter !== "All") {
            arr = arr.filter(item => item.element === filter);
        }

        return arr.map((props) => {
            return <HeroesListItem key={props.id} {...props}/>
        })
    }

    // const heroes = heroesAdapter.getSelectors().selectAll(store.getState().heroes);
    const heroes = selectAll(store.getState().heroes);
    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;