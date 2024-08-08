export const SET_SEARCH_HISTORY = 'SET_SEARCH_HISTORY';
export const SET_QUERIES = 'SET_QUERIS';

export const setSearchHistory = (history) =>({
    type: SET_SEARCH_HISTORY,
    payload: history,
});

export const setQueries = (queries) => ({
    type: SET_QUERIES,
    payload:queries
})

