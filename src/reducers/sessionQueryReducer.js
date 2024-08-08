import { SET_QUERIES, ADD_QUERY, SET_ERROR, SET_LOADING } from '../actions/sessionQueryActions';

const initialState = {
  queries: [],
  error: null,
  loading: false,
};

const sessionQueryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUERIES:
      return { ...state, queries: action.payload, error: null };
    case ADD_QUERY:
      return { ...state, queries: [...state.queries, action.payload] };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default sessionQueryReducer;
