import { Paper, Grid, Box, Typography } from '@mui/material';

const OutcomeBox = ({ title, count, color }) => {
  const titleLeftPadding =
    title === 'WINS'
      ? '16px'
      : title === 'LOSSES'
      ? '8px'
      : title === 'DRAWS'
      ? '10px'
      : title === 'NC'
      ? '22px'
      : '12px';
  return (
    <Paper
      id='outcome-box'
      elevation='0'
      style={{
        height: '40px',
        width: '140px',
        marginTop: '6px',
        // border: '1px solid black',
        borderRadius: '3px',
        backgroundColor: color,
      }}
    >
      <Grid container>
        <Grid item xs={5} pl={titleLeftPadding} pt='2.5px'>
          <Typography
            fontSize={title === 'NC' ? '22px' : '18px'}
            pt={title === 'NC' ? '1.8px' : '4.5px'}
            color={'white'}
          >
            {title}
          </Typography>
        </Grid>
        <Grid item container xs={7} pl='4.5px' justifyContent={'flex-end'}>
          <Grid item>
            <Paper
              id='white-container-count'
              elevation={0}
              style={{
                height: '36px',
                width:
                  title === 'LOSSES' || title === 'DRAWS' ? '50px' : '60px',
                backgroundColor: 'white',
                borderRadius: '2px',
                marginTop: '2px',
                marginRight: '2px',
                textAlign: 'center',
              }}
            >
              <Typography
                fontSize='30px'
                variant='h3'
                fontWeight={800}
                paddingTop={'0.5px'}
                fontFamily={'Lato'}
              >
                {count}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const FighterRecord = ({ fighterData }) => {
  return (
    <Grid container columnSpacing={0.5} justifyContent='center'>
      <Grid>
        <OutcomeBox title='WINS' count={fighterData.wins.total} color='green' />
      </Grid>
      <Grid item>
        <OutcomeBox
          title='LOSSES'
          count={fighterData.losses.total}
          color='red'
        />
      </Grid>
      <Grid item>
        {fighterData.draws !== 0 && (
          <OutcomeBox title='DRAWS' count={fighterData.draws} color='orange' />
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
export default FighterRecord;
