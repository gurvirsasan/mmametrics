import { Paper, Grid, Box, Typography } from '@mui/material';

const OutcomeBox = ({ title, count, color }) => {
  const titleLeftPadding =
    title === 'W'
      ? '12px'
      : title === 'L'
      ? '15px'
      : title === 'D'
      ? '14px'
      : title === 'NC'
      ? '5px'
      : '12px';
  return (
    <Paper
      id='outcome-box'
      elevation='2'
      style={{
        height: '40px',
        width: '100px',
        marginTop: '6px',
        // border: '1px solid black',
        backgroundColor: color,
      }}
    >
      <Grid container>
        <Grid item xs={5} pl={titleLeftPadding} pt='2.5px'>
          <Typography fontSize='25px' color={'white'}>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={7} pl='4.5px'>
          {/* <Paper w='10px' h='20px' backgroundColor='white'></Paper> */}
          <Paper
            id='white-container-count'
            elevation={0}
            style={{
              maxHeight: '30px',
              width: '50px',
              backgroundColor: 'white',
              borderRadius: '2px',
              marginTop: '4px',
              paddingTop: '2.5px',
              marginBottom: '4px',
              textAlign: 'center',
              // justifyContent: 'center',
            }}
          >
            <Typography fontSize='25px' variant='h4'>
              {count}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ({ fighterData }) => {
  const noExtras = fighterData.draws === 0 || fighterData.no_contests === 0;
  const onlyOne =
    (fighterData.draws !== 0 && fighterData.no_contests === 0) ||
    (fighterData.draws === 0 && fighterData.no_contests !== 0);
  const bothExtras = fighterData.draws === 0 && fighterData.no_contests === 0;
  return (
    <Grid container columnSpacing={0.5}>
      <Grid item>
        <OutcomeBox title='W' count={fighterData.wins.total} color='green' />
      </Grid>
      <Grid item>
        <OutcomeBox title='L' count={fighterData.losses.total} color='red' />
      </Grid>
      <Grid item>
        {fighterData.draws !== 0 && (
          <OutcomeBox title='D' count={fighterData.draws} color='grey' />
        )}
      </Grid>
      <Grid item>
        {fighterData.no_contests !== 0 && (
          <OutcomeBox title='NC' count={fighterData.no_contests} color='grey' />
        )}
      </Grid>
    </Grid>
  );
};
