import React, { Fragment } from 'react';
import { Help } from '@material-ui/icons';
import { Tooltip, Typography, Dialog, DialogContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  tooltip: {
    fontSize: 16
  },
  tooltips: {
    verticalAlign: 'middle',
    cursor: 'pointer',
    marginLeft: 4,
    width: 16,
    height: 16
  }
});

class CustomTooltips extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };
    this.handleClickOpenModal = this.handleClickOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleClickOpenModal() {
    this.setState({ open: true });
  }

  handleCloseModal() {
    this.setState({ open: false });
  }

  render() {
    const { tips, classes } = this.props;
    const { open } = this.state;
    return (
      <Fragment>
        <Tooltip
          title={tips}
          placement="top"
          classes={{
            tooltip: classes.tooltip
          }}
          className={classes.tooltips}
        >
          <Help onClick={this.handleClickOpenModal} color="secondary" />
        </Tooltip>
        <Dialog open={open} onClose={this.handleCloseModal}>
          <DialogContent>
            <Typography variant="h6">{tips}</Typography>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

export default withStyles(styles)(CustomTooltips);
