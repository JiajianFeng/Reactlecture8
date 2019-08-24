import React, { Component } from 'react';
import {
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  Typography,
  FormControl
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { ArrowForward } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import ChipInput from 'material-ui-chip-input';
import restClient from '../../lib/restClient';
import withLayout from '../../lib/withLayout';
import { Router } from '../../lib/routes';
import errorHandler from '../../lib/errorHandler';
import CustomTooltips from '../../components/Tooltips';

const styles = () => ({
  headline: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  checkBox: {
    display: 'block'
  },
  clear: {
    clear: 'both'
  },
  createButton: {
    float: 'right'
  },
  cancelButton: {
    marginRight: 10,
    float: 'right'
  }
});

class CreateCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courseName: '',
      subTitle: '',
      courseCode: '',
      courseBrief: '',
      courseDuration: 90,
      courseTags: [],
      targetAudiences: '',
      courseDetails: '',
      knowledgePoints: '',
      scores: '',
      isRecommended: false,
      submitted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isNumber', value => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCheckBoxChange(event) {
    this.setState({ [event.target.name]: event.target.checked });
  }

  handleSubmit() {
    this.setState({ submitted: true });
    const {
      courseName,
      subTitle,
      courseCode,
      courseBrief,
      courseDuration,
      courseTags,
      targetAudiences,
      courseDetails,
      knowledgePoints,
      scores,
      isRecommended
    } = this.state;

    restClient()
      .post(`courses`, {
        CourseName: courseName,
        SubTitle: subTitle,
        CourseCode: courseCode,
        CourseBrief: courseBrief,
        CourseDuration: courseDuration,
        CourseTags: courseTags.join(','),
        TargetAudiences: targetAudiences,
        CourseDetails: courseDetails,
        KnowledgePoints: knowledgePoints,
        Scores: scores,
        IsRecommended: isRecommended,
        IsActive: true
      })
      .then(() => {
        Router.push(`/`);
      })
      .catch(err => {
        errorHandler(err);
        this.setState({ submitted: false });
      });
  }

  handleAddChip = chip => {
    this.setState(prevState => {
      prevState.courseTags.push(chip);
      return prevState;
    });
  };

  handleDeleteChip = (chip, index) => {
    this.setState(prevState => {
      prevState.courseTags.splice(index, 1);
      return prevState;
    });
  };

  goBack = () => {
    Router.goBack();
  };
  render() {
    const {
      submitted,
      courseName,
      subTitle,
      courseCode,
      courseBrief,
      courseDuration,
      targetAudiences,
      courseDetails,
      knowledgePoints,
      scores,
      courseTags,
      isRecommended
    } = this.state;
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        <Grid item md={8} xs={12}>
          <Typography className={classes.headline} variant="h3" component="h3">
            Create a course
          </Typography>
          <ValidatorForm onSubmit={this.handleSubmit}>
            <TextValidator
              required
              fullWidth
              margin="normal"
              label="Course Name"
              onChange={this.handleChange}
              name="courseName"
              value={courseName}
              validators={['required', 'minStringLength:2']}
              helperText="What is the course name?"
              errorMessages={[
                'This field is required!',
                'Title cannot be shorter than 2 characters!'
              ]}
            />

            <TextValidator
              required
              fullWidth
              margin="normal"
              label="Sub title"
              onChange={this.handleChange}
              name="subTitle"
              value={subTitle}
              validators={['required', 'minStringLength:2']}
              helperText="What is the sub title of this course?"
              errorMessages={[
                'This field is required!',
                'Title cannot be shorter than 2 characters!'
              ]}
            />

            <TextValidator
              required
              fullWidth
              margin="normal"
              label="Course code"
              onChange={this.handleChange}
              name="courseCode"
              value={courseCode}
              validators={['required', 'minStringLength:3']}
              helperText="What is the code for this course?"
              errorMessages={[
                'This field is required!',
                'Title cannot be shorter than 3 characters!'
              ]}
            />

            <TextValidator
              required
              fullWidth
              margin="normal"
              label="Course brief"
              onChange={this.handleChange}
              name="courseBrief"
              value={courseBrief}
              validators={['required', 'minStringLength:8']}
              helperText="What is the brief of this course?"
              errorMessages={[
                'This field is required!',
                'Title cannot be shorter than 8 characters!'
              ]}
            />

            <TextValidator
              required
              fullWidth
              margin="normal"
              label="Target Audiences"
              onChange={this.handleChange}
              name="targetAudiences"
              value={targetAudiences}
              validators={['required', 'minStringLength:2']}
              helperText="What are the target audience for this course?"
              errorMessages={[
                'This field is required!',
                'Title cannot be shorter than 2 characters!'
              ]}
            />

            <TextValidator
              required
              fullWidth
              margin="normal"
              label="Knowledge points"
              onChange={this.handleChange}
              name="knowledgePoints"
              value={knowledgePoints}
              validators={['required', 'minStringLength:2']}
              helperText="What is the konwledge points of this course?"
              errorMessages={[
                'This field is required!',
                'Title cannot be shorter than 2 characters!'
              ]}
            />

            <TextValidator
              required
              fullWidth
              multiline
              rows="4"
              margin="normal"
              label="Course detail"
              onChange={this.handleChange}
              name="courseDetails"
              value={courseDetails}
              validators={['required', 'minStringLength:2']}
              helperText="What are the course details?"
              errorMessages={[
                'This field is required!',
                'Title cannot be shorter than 2 characters!'
              ]}
            />

            <FormControl>
              <TextValidator
                required
                fullWidth
                margin="normal"
                label="Scores"
                onChange={this.handleChange}
                name="scores"
                value={scores}
                validators={['required', 'isNumber']}
                helperText="What is the credit for this course?"
                errorMessages={['This field is required!', 'Scores must be a number!']}
              />
            </FormControl>

            <FormControl>
              <TextValidator
                required
                fullWidth
                margin="normal"
                label="Course duration"
                onChange={this.handleChange}
                name="courseDuration"
                value={courseDuration}
                validators={['required', 'isNumber']}
                helperText="What is the duration for this course by minutes?"
                errorMessages={['This field is required!', 'Duration must be a number!']}
              />
            </FormControl>

            <FormControl className={classes.checkBox}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isRecommended}
                    onChange={this.handleCheckBoxChange}
                    name="isRecommended"
                  />
                }
                label="Is Recommended"
              />
              <CustomTooltips tips="If selected, it means this course is recommended." />
            </FormControl>

            <FormControl className={classes.checkBox}>
              <br />
              <Typography>Course Tags:</Typography>
              <ChipInput
                value={courseTags}
                onAdd={this.handleAddChip}
                onDelete={this.handleDeleteChip}
              />
            </FormControl>
            <div className={classes.clear} />

            <Button
              className={classes.createButton}
              disabled={submitted}
              variant="contained"
              type="submit"
              color="primary"
            >
              <ArrowForward /> Create
            </Button>

            <Button
              className={classes.cancelButton}
              variant="contained"
              onClick={this.goBack}
              color="default"
            >
              Cancel
            </Button>
            <div className="clear" />
          </ValidatorForm>
        </Grid>
      </Grid>
    );
  }
}

export default withLayout(withStyles(styles)(CreateCourse));
