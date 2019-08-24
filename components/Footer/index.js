import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const styles = theme => ({
  footerMain: {
    clear: 'both',
    width: '100%',
    color: 'white',
    backgroundColor: '#223741',
    height: 'auto',
    textAlign: 'center',
    paddingTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 10,
      paddingRight: 10
    },
    '& p': {
      marginLeft: 13,
      color: '#89A1C0',
      fontSize: 13
    },
    '& ul': {
      listStyleType: 'none',
      color: '#bdbdbd'
    },
    '& ul li': {
      marginBottom: 5
    }
  },
  footerLinks: {
    color: '#89A1C0',
    display: 'inline-block',
    marginBottom: 5,
    textDecoration: 'none',
    fontSize: 13,
    '&:hover': {
      color: '#ffffff'
    }
  },
  copyright: {
    color: '#7D8A95',
    backgroundColor: '#223741',
    padding: 20,
    fontSize: '.7em',
    textAlign: 'center'
  }
});
class Footer extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.footerMain}>
        <Grid container direction="row" justify="space-around">
          <Grid item md={4} sm={6} xs={12}>
            <h3>Iters</h3>
            <p>
              Business, Technology and Creative Skills taught by industry experts. Explore a wide
              range of skills with our professional tutorials.
            </p>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <h3>Quick Links</h3>

            <a className={classes.footerLinks} href="/terms-of-service">
              Terms of Service
            </a>

            <br />

            <a className={classes.footerLinks} href="/privacy-policy">
              Privacy Policy
            </a>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <h3>Get In Touch</h3>

            <a className={classes.footerLinks} href="/contact-us">
              Contact Us
            </a>
          </Grid>
        </Grid>
        <footer className={classes.copyright}>© 2019, All rights reserved</footer>
      </div>
    );
  }
}

export default withStyles(styles)(Footer);
