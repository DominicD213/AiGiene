import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';

const LoginButton = ({ signUpState, loginState, loginUsername, loginPassword, newloginUsername, newloginPassword, changeLoginState, login, error, loading }) => {
  const [localError, setLocalError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginUsername || !loginPassword) {
      setLocalError('Fill out all login information');
      return;
    }

    setLocalError('');

    try {
      await login(loginUsername, loginPassword);
      if (!error) {
        changeLoginState();
      } else {
        setLocalError(error);
      }
    } catch (error) {
      console.error('Login Error:', error);
      setLocalError('Login failed');
    }
  };

  return (
    <div>
      {!signUpState && loginState && (
        <>
          <p className='text-center text-light-grey h-2'>
            __________________________________
          </p>
          <br />
          <div className='relative ml-8 w-10/12 h-full bg-light-grey rounded-2xl'>
            <div className='m-3'>
              <p className='font-bold pt-1' style={{ color: 'white' }}>
                Login
              </p>
              <form onSubmit={handleLogin}>
                <input
                  className='flex max-w-36 h-full bg-light-grey outline-none px-2 text-white m-1'
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={loginUsername}
                  onChange={(e) => newloginUsername(e.target.value)}
                  style={{ color: 'white' }}
                />
                <input
                  className='flex max-w-36 h-full bg-light-grey outline-none px-2 text-white m-1 pb-2'
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={loginPassword}
                  onChange={(e) => newloginPassword(e.target.value)}
                  style={{ color: 'white' }}
                />
                <button
                  className='bg-custom-gradient rounded-lg px-4 py-2 w-20 absolute bottom-3 right-3'
                  type='submit'
                  disabled={loading}
                >
                  Submit
                </button>
                <button
                  type='button'
                  onClick={changeLoginState}
                  className='outline-none mb-2 ml-2'
                  style={{ color: 'red' }}
                >
                  Cancel
                </button>
                {localError && (
                  <p className='pr-2 pb-1' style={{ color: 'red' }}>
                    {localError}
                  </p>
                )}
                {error && !localError && (
                  <p className='pr-2 pb-1' style={{ color: 'red' }}>
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  loading: state.auth.loading,
  user: state.auth.user,
});

const mapDispatchToProps = {
  login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton);
