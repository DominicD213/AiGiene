import React, { useState } from 'react';
import axios from 'axios';

const LoginButton = ({
  signUpState,
  loginState,
  newloginUsername,
  newloginPassword,
  changeLoginState,
  loginUsername,
  loginPassword,
  setUserImage,
}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handling the login post request
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginUsername || !loginPassword) {
      setError(<p className='pr-2 pb-1 ' style={{ color: 'red' }}>Please enter both username and password.</p>);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://aigeine-api.onrender.com/login', {
        username: loginUsername,
        password: loginPassword,
      }, {
        withCredentials: true,
      });
  
      console.log('Login response:', response.data);
      if (response.status === 200) {
        const { user } = response.data;
        setUserImage(user.image); // Set the user's image
        changeLoginState();
      } else {
        setError(<p className='pr-2 pb-1 ' style={{ color: 'red' }}>Login failed: {response.data.message || 'Unknown error'}</p>);
      }
    } catch (error) {
      console.error('Login Error:', error);
      if (error.response) {
        // The request was made and the server responded with a status code outside of the 2xx range
        setError(<p className='pr-2 pb-1 ' style={{ color: 'red' }}>{error.response.data.message || 'Login failed'}</p>);
      } else if (error.request) {
        // The request was made but no response was received
        setError(<p className='pr-2 pb-1 ' style={{ color: 'red' }}>No response from the server. Please try again later.</p>);
      } else {
        // Something else happened in setting up the request
        setError(<p className='pr-2 pb-1 ' style={{ color: 'red' }}>Login failed due to an unexpected error.</p>);
      }
    } finally {
      setLoading(false);
    }
  };

    
  return (
    <div>
      {!signUpState && loginState && (
        <>
          <p className='text-center text-light-grey h-2'>__________________________________</p>
          <br />
          <div className='relative ml-8 w-10/12 h-full bg-light-grey rounded-2xl'>
            <div className='m-3'>
              <p className='font-bold pt-1' style={{ color: 'white' }}>Login</p>
              <form onSubmit={handleLogin}>
                <input
                  className='flex max-w-36 h-full bg-light-grey outline-none px-2 text-white m-1'
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={loginUsername}
                  onChange={(e) => { newloginUsername(e.target.value); }}
                  style={{ color: 'white' }}
                  disabled={loading}
                />
                <input
                  className='flex max-w-36 h-full bg-light-grey outline-none px-2 text-white m-1 pb-2'
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={loginPassword}
                  onChange={(e) => { newloginPassword(e.target.value); }}
                  style={{ color: 'white' }}
                  disabled={loading}
                />
                <button
                  className={`bg-custom-gradient rounded-lg px-4 py-2 w-20 absolute bottom-3 right-3 ${loading ? 'opacity-50' : ''}`}
                  type='submit'
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Submit'}
                </button>
                <button
                  onClick={changeLoginState}
                  className='outline-none mb-2 ml-2'
                  style={{ color: 'red' }}
                  disabled={loading}
                >
                  Cancel
                </button>
                {error}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginButton;
