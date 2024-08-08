import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setSignUpState, setUserInfo, setError } from '../../actions/authActions';

const SignUpButton = () => {
  const dispatch = useDispatch();
  const { signUpState, username, password, email, error } = useSelector((state) => state.auth);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username || !password || !email) {
      dispatch(setError('Fill out all signup information'));
    } else {
      try {
        dispatch(setError(''));
        const response = await axios.post(`https://aigeine-api.onrender.com/signup`, {
          username,
          email,
          password,
        });

        if (response.status === 201) {
          dispatch(setSignUpState(false));
        } else {
          dispatch(setError('Signup failed'));
        }
      } catch (error) {
        dispatch(setError(error.response?.data || 'Signup failed'));
      }
    }
  };

  return (
    <div>
      {signUpState && (
        <>
          <p className='text-center text-light-grey h-2'>__________________________________</p>
          <br />
          <div className='relative mx-8 w-10/12 h-full bg-light-grey rounded-2xl'>
            <div className='m-3'>
              <p className='font-bold pt-1' style={{ color: 'white' }}>Sign Up</p>
              <form id='signUp' onSubmit={handleSignUp}>
                <input
                  type='text'
                  placeholder='Username'
                  name='username'
                  maxLength='12'
                  value={username}
                  onChange={(e) => dispatch(setUserInfo({ username: e.target.value }))}
                  className='flex bg-light-grey outline-none px-2 text-white m-1 max-w-28'
                  style={{ color: 'white' }}
                />
                <input
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={(e) => dispatch(setUserInfo({ password: e.target.value }))}
                  className='flex bg-light-grey outline-none px-2 text-white m-1 max-w-28'
                  style={{ color: 'white' }}
                />
                <input
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={(e) => dispatch(setUserInfo({ email: e.target.value }))}
                  className='flex bg-light-grey outline-none px-2 text-white m-1 pb-2 max-w-32'
                  style={{ color: 'white' }}
                />
                <button
                  className="bg-custom-gradient rounded-lg px-4 py-2 w-20 absolute bottom-3 right-3"
                  type='submit'
                >
                  Submit
                </button>
                {error && <p className='pr-2 pb-1 mr-2' style={{ color: 'red' }}>{error}</p>}

                <button
                  onClick={() => dispatch(setSignUpState(false))}
                  className='outline-none mb-2 ml-2'
                  style={{color:'red'}}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SignUpButton;
