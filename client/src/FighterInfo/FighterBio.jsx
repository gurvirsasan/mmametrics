import React, { useState, useEffect } from 'react';
import { Paper, Grid, Box, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import FighterRecord from './FighterRecord';
import FighterWiki from './FighterWiki';
import Flag from 'react-world-flags';

import countryData from '../Components/data/countries.json';

const _ = require('lodash');

export const GRID_ITEM_HEIGHT = '420px';

const FighterName = ({ fighterData }) => {
  return (
    <>
      {fighterData.nickname !== '' && (
        <Typography
          id='nickname'
          variant='h4'
          fontSize={{ sm: '1.6rem', xs: '1.15rem' }}
          fontWeight={600}
          fontFamily={'Lato'}
        >
          <i>"{fighterData.nickname}"</i>
        </Typography>
      )}
      <Typography
        id='fullName'
        variant='h4'
        fontSize={{ sm: '2rem', xs: '1.65rem' }}
        fontWeight={800}
        fontFamily={'Lato'}
      >
        {fighterData.name.toUpperCase()}
      </Typography>
    </>
  );
};

const FighterBio = ({ fighterData }) => {
  const [countryISO, setCountryISO] = useState(undefined);

  const FighterFlag = (
    <Grid
      item
      container
      id='fighter-flag-grid-container'
      xs={12}
      sm={6}
      lg={3}
      pt={{ xs: '10px', sm: '0px' }}
      alignItems={'center'}
    >
      <Grid item container direction='row'>
        <Grid
          item
          container
          xs={12}
          justifyContent={{ sm: 'flex-start', xs: 'center' }}
        >
          <Flag code={countryISO} width='300vw' border='1px solid black' />
        </Grid>
        <Grid
          item
          container
          xs={12}
          pt='5px'
          justifyContent={{ sm: 'flex-start', xs: 'center' }}
        >
          <Typography
            variant='h4'
            fontSize='1.6rem'
            fontFamily={'Lato'}
            fontWeight={800}
          >
            {fighterData.nationality.toUpperCase()}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          fontSize='0.42rem'
          justifyContent={{ sm: 'flex-start', xs: 'center' }}
        >
          <Typography fontSize='1.3rem' fontFamily={'Lato'} color='#307ae5'>
            {fighterData.locality.toUpperCase()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );

  useEffect(() => {
    const UK = ['England', 'Scotland', 'Wales', 'Northern Ireland'];
    if (UK.includes(fighterData.nationality)) return setCountryISO('GBR');

    const countryFound = countryData.find((data) =>
      Object.keys(data).find((key) => {
        const jsonCountry = data[key];
        if (
          _.isString(jsonCountry) &&
          (jsonCountry === fighterData.nationality ||
            jsonCountry.includes(fighterData.nationality))
        )
          return true;
      })
    );
    setCountryISO(countryFound?.alpha3);
  }, [fighterData]);

  const allFour = () =>
    fighterData.draws !== 0 && fighterData.no_contests !== 0;

  return (
    <Grid
      item
      container
      id='fighter-biography'
      justifyContent='center'
      align='center'
      direction='row'
      sx={{ minWidth: '375px' }}
    >
      <Grid
        id='fighter-pic-grid-container'
        item
        container
        xs={12}
        sm={6}
        lg={3}
        justifyContent={{ sm: 'flex-end', xs: 'center' }}
        alignItems='center'
      >
        <Grid item id='fighter-pic-grid-item' pr={{ xs: '0px', sm: '10px' }}>
          <img
            id='fighter-image'
            src={fighterData['image_url'] ?? './imageNotFound.png'}
            alt='fighter'
            style={{
              height: `${parseInt(GRID_ITEM_HEIGHT)}px`,
              width: '100%',
              objectFit: 'contain',
              // backgroundSize: 'cover',
            }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        id='fighter-bio-grid-item'
        xs={12}
        lg={6}
        order={{ xs: 4, lg: 0 }}
        maxWidth='500px'
        pr={{ lg: '10px' }}
      >
        <Paper
          id='fighter-bio-paper'
          elevation={2}
          sx={{
            borderRadius: '10px',
            textAlign: 'flex-start',
          }}
          mr={{ lg: '10px' }}
        >
          <Grid
            container
            id='fighter-bio-grid-container'
            px='5px'
            pb='25px'
            pt={{ lg: !allFour ? '20px' : '30px', xs: '15px' }}
            mt={{ xs: '10px', lg: '0px' }}
            minWidth='350px'
            direction='column'
            textAlign='center'
            justifyContent='space-evenly'
            height={{
              xs: parseInt(GRID_ITEM_HEIGHT) - 40 + 'px',
              lg: GRID_ITEM_HEIGHT,
            }}
          >
            <Grid
              item
              id='fighter-name-grid-item'
              pb={{ xs: '10px', md: '15px' }}
            >
              <FighterName fighterData={fighterData} />
            </Grid>

            <Grid item id='fighter-record-grid-item' pb='15px'>
              <FighterRecord fighterData={fighterData} />
            </Grid>
            <Grid item id='fighter-basic-stats' pt={{ xs: '10px', lg: '25px' }}>
              <FighterWiki fighterData={fighterData} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      {/*  */}
      {FighterFlag}
      {/*  */}
    </Grid>
  );
};

export default FighterBio;
