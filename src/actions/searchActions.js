import axios from "axios";

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';
export const SET_LOADING = 'SET_LOADING';

export const setSearchTerm = (searchTerm) => ({
  type: SET_SEARCH_TERM,
  payload: searchTerm,
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});

export const searchQuery = (searchTerm) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.post('https://aigeine-api.onrender.com/login/session-status/openAIResponse', {
      query: searchTerm,
    });
    dispatch(setSearchTerm('')); // Clear the search term after successful query
  } catch (error) {
    console.error('Error making API request:', error);
  } finally {
    dispatch(setLoading(false));
  }
};
