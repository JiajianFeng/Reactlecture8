import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { Tooltip, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CameraAlt } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import restClient from '../../lib/restClient';
import errorHandler from '../../lib/errorHandler';

const classes = {
  bannerButton: {
    margin: '0 auto',
    color: grey[200],
    backgroundColor: 'rgba(255,255,255,.4)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,.9)'
    }
  },
  noBannerButton: {
    margin: '0 auto',
    color: grey[400],
    backgroundColor: 'rgba(255,255,255,.8)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,.9)'
    }
  },
  bannerIcon: {
    color: grey[400],
    '&:hover': {
      color: grey[700]
    }
  },
  dropzone: {
    position: 'relative',
    top: '30%'
  },
  dropzonePreview: {
    left: '45%',
    position: 'relative',
    display: 'inline-block'
  }
};

class BannerEditor extends Component {
  constructor(props) {
    super(props);

    this.onDropAccepted = this.onDropAccepted.bind(this);
  }

  async onDropAccepted(imageFiles) {
    const formData = new FormData();
    formData.append('Image', imageFiles[0]);
    try {
      const response = await restClient().post(`upload`, formData);

      const coverImage = response.data.urlPath;
      const { course, finishUpload } = this.props;
      const {
        courseName,
        subTitle,
        courseCode,
        courseBrief,
        courseDuration,
        courseTags,
        targetAudience,
        courseDetails,
        knowledgePoints,
        scores,
        courseId,
        isRecommended
      } = course;

      await restClient().put(`courses/${courseId}`, {
        CourseName: courseName,
        SubTitle: subTitle,
        CourseCode: courseCode,
        CourseBrief: courseBrief,
        CourseDuration: courseDuration,
        CourseTags: courseTags,
        TargetAudiences: targetAudience,
        CourseDetails: courseDetails,
        KnowledgePoints: knowledgePoints,
        Scores: scores,
        IsRecommended: isRecommended,
        IsActive: true,
        CoverImage: coverImage
      });
      finishUpload(coverImage);
    } catch (err) {
      errorHandler(err);
    }
  }

  render() {
    const { classes, hasBanner } = this.props;
    const title = hasBanner ? 'Change banner' : 'Add banner';
    const bannerClass = classes.bannerButton;
    return (
      <div className={classes.dropzone}>
        <Dropzone onDropAccepted={this.onDropAccepted} accept="image/*" multiple={false}>
          {({ getRootProps, getInputProps }) => {
            return (
              <div {...getRootProps()} className={classes.dropzonePreview}>
                <input {...getInputProps()} />
                <Tooltip title={title} placement="top">
                  <IconButton aria-label={title} className={bannerClass}>
                    <CameraAlt className={classes.bannerIcon} />
                  </IconButton>
                </Tooltip>
              </div>
            );
          }}
        </Dropzone>
      </div>
    );
  }
}

export default withStyles(classes)(BannerEditor);
