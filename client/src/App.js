import React, { useState } from 'react';
import FighterPage from './FighterPage.jsx';
import './App.css';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchedVal, setSearchedVal] = useState('');

  const matches = useMediaQuery('(min-width:701px)');

  return (
    <>
      <div id='navBar'>
        <div className='nav-bar-container'>
          <div className='socials'>
            <a
              href='https://www.linkedin.com/in/gurvir-sasan-9a0aab192/'
              target='_blank'
            >
              <img src='./linkedIn.png' width={'30px'} alt='linkedin png' />
            </a>
            <a href='https://github.com/gurvirsasan' target='_blank'>
              <img src='./github.png' width={'30px'} alt='github png' />
            </a>
          </div>
          <div className='child searchBar'>
            <input
              placeholder='Search Fighter...'
              onChange={(e) => setSearchedVal(e.target.value)}
              onKeyPress={(e) =>
                e.key === 'Enter' && searchedVal.replace(' ', '') !== ''
                  ? setIsSearching(true)
                  : ''
              }
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
      <Box sx={{ paddingTop: matches ? '50px' : '95px' }}>
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
