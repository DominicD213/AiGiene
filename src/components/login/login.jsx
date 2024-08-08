import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import SignUpButton from '../microComponents/signUpButton';
import LoginButton from '../microComponents/loginButton';
import {
  setSignUpState,
  setLoginState,
  setUserInfo,
  setSessionActive,
  setUserImage,
} from '../../actions/loginActions';

const Login = () => {
  const dispatch = useDispatch();
  const {
    signUpState,
    loginState,
    username,
    password,
    email,
    loginUsername,
    loginPassword,
    sessionActive,
    userImage,
    imagePreview,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        console.log('Fetching session status...');
        const response = await axios.get(`https://aigeine-api.onrender.com/login/session-status`, {
          withCredentials: true,
        });

        console.log('Session status data:', response.data);

        if (response.data && response.data.active) {
          dispatch(setSessionActive(true));
          dispatch(setUserInfo({ loginUsername: response.data.user.username }));
        } else {
          dispatch(setSessionActive(false));
        }
      } catch (error) {
        console.error('Error checking session status:', error);
      }
    };

    checkSessionStatus();
  }, [dispatch]);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://aigeine-api.onrender.com/logout`, {}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log('Session logged out');
        dispatch(setSessionActive(false));
        dispatch(setUserInfo({ loginUsername: '' }));
        window.location.reload();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleImageUpload = async (file) => {
    if (!sessionActive) {
      console.error('User is not logged in');
      return;
    }

    if (!file) {
      console.error('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`https://aigeine-api.onrender.com/login/session-status/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.status === 201) {
        console.log('Image uploaded');
        dispatch(setUserImage(URL.createObjectURL(file)));
      } else {
        console.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(setUserImage(file));
      dispatch(setUserImage(URL.createObjectURL(file)));

      // Ensure the user image is uploaded automatically
      await handleImageUpload(file);
    }
  };

  return (
    <div className='my-2'>
      {!signUpState && !loginState && !sessionActive && (
        <>
          <div className='max-lg:hidden'>
            <p className="text-center text-light-grey border-t border-light-grey mx-4"></p><br />
          </div>
          <div className="w-max m-auto rounded-2xl h-10 flex">
            <button className="bg-custom-gradient rounded-lg px-4 w-20 max-lg:py-2 max-sm:w-[20vw]" onClick={() => dispatch(setLoginState(true))}>Login</button>
            <button className="bg-custom-gradient rounded-lg ml-2 px-4 w-20 max-lg:py-2 max-sm:w-[20vw]" onClick={() => dispatch(setSignUpState(true))}>SignUp</button>
          </div>
        </>
      )}

      {signUpState && (
        <SignUpButton
          signUpState={signUpState}
          loginState={loginState}
          newUsername={(value) => dispatch(setUserInfo({ username: value }))}
          newPassword={(value) => dispatch(setUserInfo({ password: value }))}
          newEmail={(value) => dispatch(setUserInfo({ email: value }))}
          changeSignUpstate={() => dispatch(setSignUpState(false))}
          username={username}
          password={password}
          email={email}
        />
      )}

      {loginState && (
        <LoginButton
          signUpState={signUpState}
          loginState={loginState}
          newloginUsername={(value) => dispatch(setUserInfo({ loginUsername: value }))}
          newloginPassword={(value) => dispatch(setUserInfo({ loginPassword: value }))}
          changeLoginState={() => dispatch(setLoginState(false))}
          loginUsername={loginUsername}
          loginPassword={loginPassword}
          setUserImage={(image) => dispatch(setUserImage(image))}
        />
      )}

      {sessionActive && (
        <>
          <div className='rounded-2xl h-10 mx-5 flex items-center max-h-10'>
            <div className='bg-light-grey rounded-2xl'>
              <img
                className="rounded-2xl h-10 w-10 cursor-pointer"
                src={userImage ? userImage : imagePreview}
                alt="person"
                onClick={() => document.getElementById('imageInput').click()}
              />
              <input
                id="imageInput"
                type='file'
                accept='image/png, image/jpeg'
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
            <p className='ml-2 w-4/6 px-5' style={{ color: 'white' }}>Welcome, {loginUsername}!</p>
            <button style={{ color: 'red' }} className="outline-none rounded-lg" onClick={handleLogout}>LogOut</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
