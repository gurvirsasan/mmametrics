import React, { useState } from 'react';
import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FighterBio from './FighterBio';
import FightHistory from './FightHistory';

const _ = require('lodash');

const FighterPage = ({
  searchedVal,
  setSearchedVal,
  isSearching,
  setIsSearching,
  isLogoClicked,
  setIsLogoClicked,
}) => {
  const theme = useTheme();
  const [fighterData, setFighterData] = useState({});

  const getFighter = () => {
    fetch(`/api/fighter?name=${searchedVal}`)
      .then((res) => res.json())
      .then((res) => {
        setIsSearching(false);
        if (!_.isEqual(fighterData, res)) setFighterData(res);
      })
      .catch((error) => {
        setIsSearching(false);
        console.error(error);
      });
  };

  if (isSearching) getFighter();

  // media queries
  const phoneView = useMediaQuery('(min-width:701px)');

  // when logo is clicked
  useEffect(() => {
    if (isLogoClicked) {
      setFighterData({});
      setSearchedVal('');
      setIsLogoClicked(false);
    }
  }, [isLogoClicked]);

  useEffect(() => {
    console.log(fighterData);
  }, [fighterData]);

  if (isSearching) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '30vh',
        }}
      >
        Loading...
      </div>
    );
  }
  if (fighterData.errorMessage) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '30vh',
        }}
      >
        {fighterData.errorMessage + ' :('}
      </div>
    );
  }

  if (_.isEqual(fighterData, {})) {
    return (
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        sx={
          !phoneView
            ? { fontSize: '14px', paddingTop: '30vh' }
            : { paddingTop: '30vh' }
        }
      >
        <Grid item>
          <img
            id='rachel'
            src='/colored-mmametrics-logo.png'
            width={'250px'}
            alt='mmametrics'
          />
        </Grid>
        <Grid item pt='20px'>
          <Typography variant='p'>Sup! Search for any MMA fighter!</Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box
          sx={{
            paddingTop: phoneView ? '60px' : '95px',
          }}
        >
          <Grid
            container
            id='fighter-data'
            justify='center'
            direction='column'
            alignItems='center'
            sx={{
              minWidth: phoneView ? '550px' : '350px',
              minHeight: phoneView ? '1000px' : '830px',
            }}
          >
            {/* FIGHTER BIO */}
            <Grid
              item
              container
              id='fighter-biography'
              justifyContent='center'
              align='center'
              direction='row'
            >
              <FighterBio fighterData={fighterData} />
            </Grid>
            {/* FIGHT HISTORY */}
            <Grid item container>
              <FightHistory
                fighterData={fighterData}
                setSearchedVal={setSearchedVal}
                setIsSearching={setIsSearching}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FighterPage;
