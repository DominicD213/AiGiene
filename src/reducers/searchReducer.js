import { SET_SEARCH_TERM, SET_LOADING } from '../actions/searchActions';

const initialState = {
  searchTerm: '',
  loading: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_TERM:
      return { ...state, searchTerm: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default searchReducer;
