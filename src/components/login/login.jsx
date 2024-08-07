import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconPerson from '../../Assets/personPlaceHolder.png';
import SignUpButton from '../microComponents/signUpButton';
import LoginButton from '../microComponents/loginButton';

const Login = () => {
  const [signUpState, setSignUpState] = useState(false);
  const [loginState, setLoginState] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [sessionActive, setSessionActive] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(IconPerson);

  useEffect(() => {
    const checkSessionStatus = async () => {
      try {
        console.log('Fetching session status...');
        const response = await axios.get('http://localhost:4000/login/session-status', {
          withCredentials: true,
        });

        console.log('Session status data:', response.data);

        if (response.data && response.data.active) {
          setSessionActive(true);
          setLoginUsername(response.data.user.username);
        } else {
          setSessionActive(false);
        }
      } catch (error) {
        console.error('Error checking session status:', error);
      }
    };

    checkSessionStatus();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/logout', {}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log('Session logged out');
        setSessionActive(false);
        setLoginUsername('');
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
        const response = await axios.post('http://localhost:4000/login/session-status/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
        });

        if (response.status === 201) {
            console.log('Image uploaded');
            setImagePreview(URL.createObjectURL(file));
        } else {
            console.error('Image upload failed');
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
  };

  const toggleSignUpState = () => {
    setSignUpState(!signUpState);
  };

  const toggleLoginState = () => {
    setLoginState(!loginState);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
        setUserImage(file);
        setImagePreview(URL.createObjectURL(file));
        
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
            <button className="bg-custom-gradient rounded-lg px-4 w-20 max-lg:py-2 max-sm:w-[20vw]" onClick={toggleLoginState}>Login</button>
            <button className="bg-custom-gradient rounded-lg ml-2 px-4 w-20 max-lg:py-2 max-sm:w-[20vw]" onClick={toggleSignUpState}>SignUp</button>
          </div>
        </>
      )}

      
      {signUpState && (
        <SignUpButton
          signUpState={signUpState}
          loginState={loginState}
          newUsername={setUsername}
          newPassword={setPassword}
          newEmail={setEmail}
          changeSignUpstate={toggleSignUpState}
          username={username}
          password={password}
          email={email}
        />
      )}

      {loginState && (
        <LoginButton
          signUpState={signUpState}
          loginState={loginState}
          newloginUsername={setLoginUsername}
          newloginPassword={setLoginPassword}
          changeLoginState={toggleLoginState}
          loginUsername={loginUsername}
          loginPassword={loginPassword}
          setUserImage={setUserImage}
        />
      )}
      
      {sessionActive && (
        <>
          <div className='rounded-2xl h-10 mx-5 flex items-center max-h-10'>
          {/*
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
           */}
            <p className='ml-2 w-4/6 px-5' style={{ color: 'white' }}>Welcome, {loginUsername}!</p>
            <button style={{color:'red'}} className="outline-none rounded-lg" onClick={handleLogout}>LogOut</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
