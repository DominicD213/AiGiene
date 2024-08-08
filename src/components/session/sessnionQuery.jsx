import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../../socket';
import { fetchQueries, addQuery } from '../actions/sessionQueryActions';

const SessionQuery = () => {
  const dispatch = useDispatch();
  const { queries, error, loading } = useSelector((state) => state.sessionQuery);
  const queriesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchQueries());

    // Listen for new queries via WebSocket
    socket.on('newQuery', (newQuery) => {
      dispatch(addQuery(newQuery));
    });

    return () => {
      socket.off('newQuery'); // Clean up the socket event listener
    };
  }, [dispatch]);

  useEffect(() => {
    if (queriesEndRef.current) {
      queriesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [queries]);

  return (
    <div className="flex flex-col h-full mx-5 mt-10 rounded">
      <div className="w-auto flex-grow rounded-lg p-4 overflow-auto">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-8">
          {queries.map((item, i) => (
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
          ))}
          <div ref={queriesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default SessionQuery;
