import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const FighterPage = () => {
  const [fighterData, setFighterData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedVal, setSearchedVal] = useState('');

  const fetchFighter = () => {
    setIsSearching(true);
    fetch(`/api/fighter?name=${searchedVal}`)
      .then((res) => res.json())
      .then((fighterData) => {
        setIsSearching(false);
        setFighterData(fighterData);
      })
      .catch((error) => {
        setIsSearching(false);
        console.error(error);
      });
  };
  const displayJSON = () => {
    if (!fighterData) return;
    if (fighterData.errorMessage) return <h4>{fighterData.errorMessage}</h4>;
    return (
      <div>
        {Object.keys(fighterData).map((key, i) => (
          <div>
            {key}: {JSON.stringify(fighterData[key])}
          </div>
        ))}
      </div>
    );
  };

  const Loading = () => <p>{isSearching ? 'Loading...' : ''}</p>;

  return (
    <>
      <TextField
        id='search-name'
        label='Search Fighter'
        variant='outlined'
        fullWidth
        helperText={searchedVal === '' ? "Please enter fighter's name" : ''}
        onChange={(e) => setSearchedVal(e.target.value)}
        onKeyPress={(e) => (e.key === 'Enter' ? fetchFighter() : '')}
        margin='normal'
      />

      <Loading />

      {displayJSON()}
    </>
  );
};

export default FighterPage;
