const initialState = {
    filters: [],
    activeFilter: "All",
}

const filters = (state = initialState, action) => {
    switch (action.type) {   
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

export default filters;