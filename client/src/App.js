import React, { useState } from 'react';
import FighterPage from './FighterInfo/FighterPage.jsx';
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
      <FighterPage
        searchedVal={searchedVal}
        isSearching={isSearching}
        setIsSearching={setIsSearching}
      />
    </>
  );
}

export default App;
