export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroCreate = (hero) => {
    return {
        type: 'HERO_CREATE',
        payload: hero,
    }
}

export const heroDelete = (id) => {
    return {
        type: 'HERO_DELETE',
        payload: id,
    }
}

export const createFilters = (filters) => {
    return {
        type: 'FILTERS_CREATE',
        payload: filters,
    }
}

export const activeFilterUpdate = (filter) => {
    return {
        type: 'ACTIVE_FILTER_UPDATE',
        payload: filter,
    }
}