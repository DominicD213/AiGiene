import { SET_SEARCH_HISTORY,SET_QUERIES } from "../actions/historyActions";

const initialState = {
    searchHistory: '',
    queries:[]
}

const historyReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_SEARCH_HISTORY:
        return { ...state, searchHistory: action.payload };
      case SET_QUERIES:
        return { ...state, queries: action.payload };
      default:
        return state;
    }
};

export default historyReducer;