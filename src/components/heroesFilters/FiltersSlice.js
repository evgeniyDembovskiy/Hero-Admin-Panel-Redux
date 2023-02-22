import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    activeFilter: "All",
}


const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        createFilters: (state, action) => {
            state.filters = action.payload;
        },
        activeFilterUpdate: (state, action) => {state.activeFilter = action.payload},
    },
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    createFilters,
    activeFilterUpdate,
} = actions;