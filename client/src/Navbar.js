const Navbar = ({
  searchedVal,
  setSearchedVal,
  setIsSearching,
  isLogoClicked,
  setIsLogoClicked,
}) => {
  return (
    <div id='navBar'>
      <div className='nav-bar-container'>
        <div className='socials'>
          <a
            href='https://www.linkedin.com/in/gurvir-sasan-9a0aab192/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='./linkedIn.png' width={'30px'} alt='linkedin png' />
          </a>
          <a
            href='https://github.com/gurvirsasan'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='./github.png' width={'30px'} alt='github png' />
          </a>
        </div>
        <div className='child searchBar'>
          <input
            placeholder='Search Fighter...'
            onChange={(e) => setSearchedVal(e.target.value)}
            onKeyPress={(e) => {
              if (
                e.key === 'Enter' &&
                searchedVal.replace(' ', '') !== '' &&
                e.target.value !== ''
              ) {
                setIsSearching(true);
              }
            }}
            value={searchedVal}
          />
        </div>
        <div className='logo' onClick={() => setIsLogoClicked(true)}>
          <img
            src='/mmametricsLogo.png'
            width={'150px'}
            alt='mmametrics logo'
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
