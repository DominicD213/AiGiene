import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io(`${process.env.CLIENTAPI}`);

const SessionQuery = () => {
    const [queries, setQueries] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const queriesEndRef = useRef(null);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get(`${process.env.CLIENTAPI}/login/session-status/openAIResponse/responseQuery`);
                setQueries(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Query Error:', error);
                setError('No requests Found');
                setLoading(false);
            }
        };

        fetchQueries();

        // Listen for new queries via WebSocket
        socket.on('newQuery', (newQuery) => {
            setQueries((prevQueries) => [...prevQueries, newQuery]);
        });

        return () => {
            socket.off('newQuery'); // Clean up the socket event listener
        };
    }, []);

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
