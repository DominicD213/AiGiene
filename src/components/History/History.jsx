import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Search from '../../Assets/whiteSearchIcon.png';
import io from 'socket.io-client';

// Initialize WebSocket connection
const socket = io('https://aigeiene-api.onrender.com');

const History = () => {
  const [searchHistory, setSearchHistory] = useState(''); // State to hold search input
  const [queries, setQueries] = useState([]); // State to hold the list of queries
  const queriesEndRef = useRef(null); // Reference to the end of the queries list for scrolling

  // Fetch queries when searchHistory changes
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get('/login/session-status/search/history', {
          params: { query: searchHistory }
        });
        setQueries(response.data); // Set the fetched queries to state
      } catch (error) {
        console.error('Error fetching search history:', error); // Log any errors
      }
    };

    if (searchHistory) {
      fetchQueries(); // Fetch queries if searchHistory is not empty
    }
  }, [searchHistory]);

  // Listen for new queries via WebSocket
  useEffect(() => {
    socket.on('newQuery', (newQuery) => {
      setQueries((prevQueries) => [...prevQueries, newQuery]); // Add new query to the list
    });

    return () => {
      socket.off('newQuery'); // Clean up the socket event listener
    };
  }, []);

  // Scroll to the end of the queries list when queries state changes
  useEffect(() => {
    if (queriesEndRef.current) {
      queriesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [queries]);

  // Handle search input change
  const handleSearchHistoryChange = (e) => {
    setSearchHistory(e.target.value); // Update searchHistory state with input value
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSearchHistory(searchHistory); // Trigger search with current input value
  };

  return (
    <div>
      <div className='ml-5'>
        <h1 className='font-bold' style={{ color: 'white' }}>History</h1>
        <form className='ml-3' onSubmit={handleFormSubmit}>
          <div className='bg-light-grey rounded-lg mt-2 h-10 flex items-center w-11/12 max-w-lg'>
            <button className='h-full px-3' type='submit'>
              <img className='max-h-6 max-w-6 min-w-5 min-h-5' src={Search} alt='search' />
            </button>
            <input
              className='flex h-full bg-light-grey outline-none mr-5 rounded-lg w-3/5'
              type='text'
              placeholder='Search history'
              value={searchHistory}
              onChange={handleSearchHistoryChange}
              style={{ color: 'white' }}
            />
          </div>
        </form>
        <div className="space-y-4 flex flex-col mx-5 mt-10 rounded overflow-auto max-h-[50vh]">
                  {searchHistory !== '' ?(
                    queries.map((item, i) => (
                       <div key={i} className="space-y-4">
                       <div className="animate-fade-right">
                           <div className="flex justify-end">
                               <div className="ml-8 max-w-xs p-4 bg-custom-gradient rounded-lg">
                                   <h2 className="text-lg font-bold">Query:</h2>
                                   <p>{item.query}</p>
                               </div>
                           </div>
                       </div>
                       <div className="">
                           <div className="flex justify-start">
                               <div className="mr-8 lg:[w-lg] max-lg:[w-auto] p-4 bg-custom-text-gradient rounded-lg">
                                   <h2 className="text-lg font-bold">Response:</h2>
                                   <p>{item.response}</p>
                               </div>
                           </div>
                       </div>
                   </div>
                    ))) : null}
          <div ref={queriesEndRef} /> {/* Reference to scroll to the end of the queries list */}
        </div>
      </div>
    </div>
  );
};

export default History;
