import React, { useState } from 'react';
import FighterPage from './FighterPage.jsx';
import './App.css';
import Navbar from './Navbar.js';

import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';

function App() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchedVal, setSearchedVal] = useState('');
  const matches = useMediaQuery('(min-width:701px)');
  return (
    <>
      <Navbar
        searchedVal={searchedVal}
        setSearchedVal={setSearchedVal}
        setIsSearching={setIsSearching}
      />
      {/* page content */}
      <Box sx={{ paddingTop: matches ? '60px' : '95px' }}>
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
