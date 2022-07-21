const Navbar = ({ searchedVal, setSearchedVal, setIsSearching }) => {
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
            onKeyPress={(e) =>
              e.key === 'Enter' && searchedVal.replace(' ', '') !== ''
                ? setIsSearching(true)
                : ''
            }
          />
        </div>
        <div className='logo'>
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