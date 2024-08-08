import axios from 'axios';

export const SET_QUERIES = 'SET_QUERIES';
export const ADD_QUERY = 'ADD_QUERY';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

export const setQueries = (queries) => ({
  type: SET_QUERIES,
  payload: queries,
});

export const addQuery = (query) => ({
  type: ADD_QUERY,
  payload: query,
});

export const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const fetchQueries = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('https://aigeine-api.onrender.com/login/session-status/openAIResponse/responseQuery');
    dispatch(setQueries(response.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.error('Query Error:', error);
    dispatch(setError('No requests Found'));
    dispatch(setLoading(false));
  }
};
