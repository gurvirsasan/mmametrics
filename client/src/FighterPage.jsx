import React, { useState } from 'react';
import { useEffect } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';

const _ = require('lodash');

const FighterPage = ({ searchedVal, isSearching, setIsSearching }) => {
  const [fighterData, setFighterData] = useState({});

  const getFighter = () => {
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

  if (isSearching) getFighter();

  const matches = useMediaQuery('(min-width:701px)');

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

  if (_.isEqual(fighterData, {})) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '20px',
        }}
      >
        {
          <Typography
            variant='p'
            sx={!matches && { fontSize: '14px', paddingTop: '30vh' }}
          >
            Hi! Search for any MMA fighter you can think of
          </Typography>
        }
      </div>
    );
  }

  if (fighterData.errorMessage) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '20px',
        }}
      >
        {fighterData.errorMessage + ' :('}
      </div>
    );
  }

  return (
    <>
      <Grid
        container
        id='fighter-data'
        justify='center'
        direction='column'
        alignItems='center'
        sx={{
          minWidth: matches ? '550px' : '350px',
          minHeight: matches ? '1000px' : '830px',
          // backgroundColor: 'red',
        }}
      >
        <Grid
          item
          container
          id='fighter-biography'
          justifyContent='center'
          align='center'
          direction='row'
          sx={{ paddingBottom: '10px' }}
        >
          <Grid item xs={12} md={3} sx={{ height: '400px' }}>
            <img
              id='fighter-image'
              src={fighterData['image_url'] ?? './imageNotFound.png'}
              alt='fighter image'
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ height: '400px', backgroundColor: 'green' }}
          >
            <Typography variant='h6'>Swag</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={3}
            sx={{ height: '400px', backgroundColor: 'yellow' }}
          >
            <Typography variant='h6'>overlaodde</Typography>
          </Grid>
        </Grid>
        <Grid item id='fighter-record'></Grid>
      </Grid>
    </>
  );
};

export default FighterPage;
