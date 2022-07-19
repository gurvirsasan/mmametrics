import React, { useState } from 'react';
import FighterPage from './FighterPage.jsx';
import './App.css';

import Box from '@mui/material/Box';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchedVal, setSearchedVal] = useState('');
  const Loading = () => <p>{isSearching ? 'Loading...' : ''}</p>;

  return (
    <>
      <div id='header'>
        <div className='nav-bar-container'>
          <div className='socials'>
            <a href='https://www.linkedin.com/in/gurvir-sasan-9a0aab192/'>
              <img src='./linkedIn.png' width={'40px'} alt='linkedin png' />
            </a>
            <a href='https://github.com/gurvirsasan'>
              <img src='./github.png' width={'40px'} alt='github png' />
            </a>
          </div>
          <div className='child'>
            <input
              placeholder='Search Fighter...'
              onChange={(e) => setSearchedVal(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' ? setIsSearching(true) : ''
              }
              style={{
                height: '50px',
                width: '50vh',
                backgroundColor: 'white',
                fontSize: '18px',
                borderRadius: '25px',
                padding: '0 25px 0 25px',
              }}
            />
          </div>
          <div className='logo'>
            <img
              src='/mmametricsLogo.png'
              width={'175px'}
              alt='mmametrics logo'
            />
          </div>
        </div>
      </div>
      {/* page content */}
      <Box sx={{ paddingTop: '60px' }}>
        <Loading />
        <FighterPage
          searchedVal={searchedVal}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
      </Box>
    </>
  );
}

export default App;
