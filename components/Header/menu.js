import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, List, ListItem, ListItemText, Popover } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Router } from '../../lib/routes';

const styles = () => ({
  menuAvatar: {
    display: 'inline-block',
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  usernameAvatar: {
    verticalAlign: 'middle',
    cursor: 'pointer'
  },
  avatarBlock: {
    display: 'inline-block',
    marginLeft: 20
  }
});

class MenuDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose() {
    this.setState({ anchorEl: null });
  }

  redirectProfile = () => {
    Router.push('/profile');
  };

  redirectSubscription = () => {
    Router.push('/subscriptions');
  };
  render() {
    const { anchorEl } = this.state;

    const { user, classes, deauthenticate } = this.props;
    return (
      <Fragment>
        <div className={classes.avatarBlock}>
          <Avatar
            role="presentation"
            aria-owns="simple-menu"
            aria-haspopup="true"
            onClick={this.handleClick}
            onKeyPress={this.handleClick}
            alt={user.firstName}
            className={classes.usernameAvatar}
          >
            {(user.firstName && user.firstName.charAt(0)) || (user.email && user.email.charAt(0))}
          </Avatar>
        </div>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          <List component="nav">
            <ListItem button component="button" onClick={this.redirectProfile}>
              <ListItemText primary="My Profile" />
            </ListItem>
            {user.role === 'Student' && (
              <ListItem button component="button" onClick={this.redirectSubscription}>
                <ListItemText primary="Course subscriptions" />
              </ListItem>
            )}

            <ListItem button onClick={deauthenticate}>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Popover>
      </Fragment>
    );
  }
}

MenuDrop.propTypes = {
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuDrop);
