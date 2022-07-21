import React, { useState } from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FighterRecord from './FighterRecord';
const _ = require('lodash');

const GRID_ITEM_HEIGHT = '430px';

const FighterBio = ({ fighterData }) => {
  const theme = useTheme();

  // media queries
  const phoneView = useMediaQuery('(min-width:701px)');
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  const xs = useMediaQuery(theme.breakpoints.up('xs'));

  return (
    <Grid
      item
      container
      id='fighter-biography'
      justifyContent='center'
      align='center'
      direction='row'
      sx={{ height: { GRID_ITEM_HEIGHT } }}
    >
      <Grid
        id='fighter-pic-grid-container'
        item
        container
        xs={12}
        sm={3}
        justifyContent={{ md: 'flex-end', xs: 'center' }}
        alignItems='center'
      >
        <Grid item id='fighter-pic-grid-item' pr='10px'>
          <img
            id='fighter-image'
            src={fighterData['image_url'] ?? './imageNotFound.png'}
            alt='fighter'
            style={{
              height: `${parseInt(GRID_ITEM_HEIGHT) - 10}px`,
              width: '100%',
              objectFit: 'contain',
            }}
          />
        </Grid>
      </Grid>
      <Grid
        item
        id='fighter-bio-grid-item'
        xs={12}
        sm={6}
        order={{ xs: 4, sm: 0 }}
      >
        <Paper
          id='fighter-bio-paper'
          elevation='2'
          sx={{
            height: GRID_ITEM_HEIGHT,
            // margin: '5px 10px 5px 510x',
            my: '5px',
            mx: '10px',
            borderRadius: '10px',
            textAlign: 'flex-start',
          }}
        >
          <Grid
            container
            id='fighter-bio-grid-container'
            padding={'15px 25px 25px 25px'}
            justifyContent='flex-start'
            direction='column'
            textAlign='left'
            spacing='2px'
          >
            {/* FIGHTER NAME GRID ITEM */}
            <Grid item id='fighter-name-grid-item' padding={'15px 0x 25px 0px'}>
              <Typography
                variant='h4'
                fontSize='1.2rem'
                fontWeight={700}
                fontFamily={'Lato'}
                sb='0'
              >
                <i>{fighterData.nickname.toUpperCase()}</i>
              </Typography>
              <Typography
                variant='h4'
                fontSize='2em'
                fontWeight={400}
                fontFamily={'Lato'}
              >
                {fighterData.name.toUpperCase()}
              </Typography>
            </Grid>
            {/* RECORD GRID ITEM */}
            <Grid item id='fighter-record-grid-item'>
              <FighterRecord fighterData={fighterData} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid
        item
        xs={12}
        sm={3}
        sx={{
          // height: xs ? '200px' : {GRID_ITEM_HEIGHT},
          backgroundColor: 'yellow',
        }}
      >
        <Typography variant='h6'>overlaodde</Typography>
      </Grid>
    </Grid>
  );
};

export default FighterBio;
