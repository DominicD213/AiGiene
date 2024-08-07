import React from 'react';
import logo from '../../Assets/AIlogo.png'

const Header = () => {
  return (
    <div>
        <div class = 'flex items-center ml-8 my-4'> 
            <img class='w-10 h-10' src={logo}  alt='ai'/>
            <h1 class='text-2xl' style={{ color: 'white' }}>Giene</h1>
        </div>
        <div className='max-lg:hidden'>
          <p className="text-center text-light-grey border-t border-light-grey w-[full] mx-4"></p><br />
        </div>
    </div>
  );
}

export default Header;
