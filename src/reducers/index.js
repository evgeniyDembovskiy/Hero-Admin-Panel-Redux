const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activeFilter: "All",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case "HERO_CREATE":
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            }  
        case "HERO_DELETE":
            return {
                ...state,
                heroes: state.heroes.filter(item => item.id !== action.payload),
            }   
        case "FILTERS_CREATE":
            return {
                ...state,
                filters: action.payload,
            }   
        case "ACTIVE_FILTER_UPDATE":
            return {
                ...state,
                activeFilter: action.payload,
            }   
            
        default: return state
    }
}

export default reducer;