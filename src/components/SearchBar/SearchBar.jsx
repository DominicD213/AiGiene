import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      setLoading(true); // Set loading state to true

      // Make API call to OpenAI endpoint
      await axios.post(`https://aigeine-api.onrender.com/login/session-status/openAIResponse`, {
        query: searchTerm,
      });

    } catch (error) {
      console.error('Error making API request:', error);
    } finally {
      setLoading(false); // Set loading state back to false
      setSearchTerm('');
    }
  };

  return (
    <div className='text-white flex items-center m-auto lg:m-auto w-4/6'>
      <form className='relative flex items-center m-auto max-sm:w-full w-4/5'>
        <input
          type='text'
          value={searchTerm}
          onChange={handleInputChange}
          className='h-12 bg-light-grey outline-none p-4 text-white text-lg rounded-lg max-sm:w-2/5'
          placeholder='Search...'
          style={{ color: 'white', width: '100%', maxWidth: '40rem' }}
        />
        <button
          onClick={handleSearchClick}
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
