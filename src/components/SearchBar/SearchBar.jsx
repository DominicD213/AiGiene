import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm, searchQuery } from '../../actions/searchActions';

const SearchBar = () => {
  const searchTerm = useSelector(state => state.search.searchTerm);
  const loading = useSelector(state => state.search.loading);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    dispatch(searchQuery(searchTerm));
  };

  return (
    <div className='text-white flex items-center m-auto lg:m-auto w-4/6'>
      <form className='relative flex items-center m-auto max-sm:w-full w-4/5' onSubmit={handleSearchClick}>
        <input
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          className='h-12 bg-light-grey outline-none p-4 text-white text-lg rounded-lg max-sm:w-2/5'
          placeholder='Search...'
          style={{ color: 'white', width: '100%', maxWidth: '40rem' }}
        />
        <button
          type='submit'
          className={`bg-custom-gradient rounded-lg px-2 py-2 max-w-28 h-12 ml-2 max-sm:w-1/5 ${loading ? 'animate-bounce opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
