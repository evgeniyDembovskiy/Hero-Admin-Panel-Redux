import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from './../../hooks/http.hook';

const heroesAdapter = createEntityAdapter(); // Вернется объект 

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle',
});

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// }

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes', // имя среза/тип действия
    () => {  // Функция, которая обычно работает с асинхронным кодом, возвращает промис
        const { request } = useHttp();
        return request("http://localhost:3001/heroes")
    }
);

const heroesSlice = createSlice({
    name: "heroes",
    initialState,
    reducers: {
        heroCreate: (state, action) => {state.heroes.push(action.payload)},
        heroDelete: (state, action) => {state.heroes = state.heroes.filter(item => item.id !== action.payload)},
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = "loading"})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = "idle";
                heroesAdapter.setMany(state, action.payload)
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected,  state => {state.heroesLoadingStatus = "error"})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = heroesSlice;

export const { selectAll } = heroesAdapter.getSelectors();

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreate,
    heroDelete,
} = actions;