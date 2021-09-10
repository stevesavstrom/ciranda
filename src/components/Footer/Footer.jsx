import React from 'react';
import './Footer.css';
import Typography from '@material-ui/core/Typography';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {

  return (
    <div className="footerContainer">
    <footer className="footerWrapper">
      <Typography className="footerText">
        &copy; 2021 Ciranda, Inc. All Rights Reserved
      </Typography>
    </footer>
    </div>
  );
}

export default Footer;
