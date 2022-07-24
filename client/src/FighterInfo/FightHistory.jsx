import { Box, Paper, Grid, Typography } from '@mui/material';
import { BACKGROUND_COLOR } from '../App';

const FightCard = ({ fight }) => {
  return (
    <Grid
      item
      container
      height='auto'
      minHeight='100px'
      width={{ lg: '70%', sm: '85%', xs: '100%' }}
      // backgroundColor='yellow'
      mt='-4px'
      border={`4px solid ${BACKGROUND_COLOR}`}
    >
      {/* FIGHT RESULT */}
      <Grid
        item
        container
        xs={1.3}
        sm={1}
        minWidth='40px'
        // border='1px solid black'
      >
        <Grid
          item
          container
          justifyContent='center'
          alignItems='center'
          mx={{ md: '5px' }}
          my={{ md: '5px' }}
          border={{ xs: `2px solid white`, md: '0px' }}
          backgroundColor={
            fight.result === 'win'
              ? 'green'
              : fight.result === 'loss'
              ? 'red'
              : fight.result === 'NC'
              ? 'grey'
              : 'orange'
          }
        >
          <Grid item>
            <Typography
              variant='p'
              fontWeight={{ xs: 600, md: 800 }}
              fontSize={{ xs: '1.4rem', md: '2rem' }}
              fontFamily='Lato'
              color='white'
            >
              {fight.result !== 'NC'
                ? fight.result[0].toUpperCase()
                : fight.result.slice(0, 2).toUpperCase()}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* FIGHT OPPONENT */}
      <Grid
        item
        container
        id='fight-opponent-and-date'
        xs={3}
        row='column'
        borderRight='1px solid black'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        px='2px'
        overflow={'auto'}
      >
        <Grid item container xs={12} id='oppnent-name' direction='column'>
          <Grid item>
            <Typography
              variant='p'
              fontWeight={600}
              fontSize={{ xs: '0.8rem', sm: '1rem' }}
            >
              {fight.opponent}
            </Typography>
          </Grid>
          <Grid item pt='10px'>
            <Typography
              variant='p'
              fontWeight={400}
              fontSize={{ xs: '0.7rem', sm: '0.9rem' }}
            >
              {fight.date}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* FIGHT DETAILS */}
      <Grid
        item
        container
        xs={7.5}
        sm={8}
        minWidth='100px'
        id='fight-details'
        justifyContent='center'
        alignItems='center'
      >
        <Grid
          item
          container
          xs={12}
          justifyContent='center'
          textAlign={'center'}
        >
          <Grid item pt='5px'>
            <Typography
              variant='p'
              fontWeight={600}
              fontSize={{ xs: '0.8rem', sm: '1rem' }}
            >
              <a
                href={fight.url}
                style={{ textDecoration: 'none', color: 'inherit' }}
                target='_blank'
                rel='noopener noreferrer'
              >
                {fight.name}
              </a>
            </Typography>
          </Grid>
        </Grid>
        {/*  */}
        <Grid item justifyContent={'flex-start'} textAlign='center'>
          <Typography variant='p' fontSize={{ xs: '0.8rem', sm: '1rem' }}>
            <i
              style={{
                color:
                  fight.result === 'win'
                    ? 'green'
                    : fight.result === 'loss'
                    ? 'red'
                    : fight.result === 'NC'
                    ? 'grey'
                    : 'orange',
              }}
            >
              {fight.method}
            </i>
          </Typography>
        </Grid>
        <Grid
          item
          container
          id='fight-stats'
          xs={12}
          justifyContent={{ xs: 'center', md: 'space-evenly' }}
          alignItems={{ xs: 'flex-start', md: 'center' }}
          direction={{ xs: 'column', md: 'row' }}
          mt='5px'
          pl='10px'
          pb='5px'
        >
          <Grid item>
            <Typography
              variant='p'
              fontWeight={400}
              fontSize={{ xs: '0.8rem', sm: '1rem' }}
            >
              Round:
              <span style={{ color: BACKGROUND_COLOR }}> {fight.round}</span>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant='p'
              fontWeight={400}
              fontSize={{ xs: '0.8rem', sm: '1rem' }}
            >
              Time:
              <span style={{ color: BACKGROUND_COLOR }}> {fight.time}</span>
            </Typography>
          </Grid>
          {fight.referee && (
            <Grid item>
              <Typography
                variant='p'
                fontWeight={400}
                fontSize={{ xs: '0.8rem', sm: '1rem' }}
              >
                Refree:
                <span style={{ color: BACKGROUND_COLOR }}>
                  {' '}
                  {fight.referee}
                </span>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

const FightHistory = ({ fighterData }) => {
  if (fighterData.fights === undefined) return '';
  return (
    <Grid
      item
      container
      xs={12}
      pt='10px'
      alignItems='center'
      justifyContent='center'
    >
      <Grid
        item
        container
        width='100%'
        height='30px'
        backgroundColor={BACKGROUND_COLOR}
        justifyContent='center'
        alignItems='center'
      >
        <Grid item>
          <Typography variant='p' fontWeight={800} color='white'>
            PROFESSIONAL FIGHT HISTORY
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        justifyContent='center'
        alignItems='center'
        mt='20px'
      >
        {fighterData.fights.map((fight) => (
          <FightCard fight={fight} key={fight.name} />
        ))}
      </Grid>
    </Grid>
  );
};

export default FightHistory;
