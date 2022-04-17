import { useState, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles, Box, CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';

import StepHeader from 'components/TutorApplication/StepHeader';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import { megabyte } from 'constants/constants';

import { uploadResume } from 'services/freelancer/freelancers';
import { SnackbarContext } from 'context/snackbarContext';

import uploadIcon from 'assets/icons/upload.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  inputContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: 5,
    border: '1px dashed #013673',
    backgroundColor: '#F6F7FB',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginBottom: '20px',
  },
  inputDragActive: {
    border: '1px solid black',
    '& $inputIcon': {
      transform: 'rotate(180deg)',
    },
  },
  inputText: {
    color: theme.palette.spaceBlue,
    textTransform: 'uppercase',
  },
  inputNote: {
    color: theme.palette.spaceBlue,
  },
  inputIcon: {
    width: '100px',
    marginBottom: '20px',
    transition: 'all 0.3s',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

function Resume() {
  const classes = useStyles();
  const history = useHistory();
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const { showSnackbar } = useContext(SnackbarContext);
  const handleInputChange = (event) => {
    setUploaded(false);
    const files = [];
    const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    for (var i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      files.push(file);
    }
    return files;
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    getFilesFromEvent: (event) => handleInputChange(event),
    maxSize: 10 * megabyte,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setUploading(true);
    let formData = new FormData();
    formData.append('resume', acceptedFiles[0]);

    uploadResume(formData)
      .then(() => {
        setUploaded(true);
        setUploading(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setUploading(false);
      });
  };

  const isReadyToUpload = () => Boolean(acceptedFiles[0]);

  const renderMessage = () => {
    if (isDragActive) {
      return (
        <>
          <img className={classes.inputIcon} src="/icons/upload.svg" alt="upload" />
          <StyledTypography fontSize={20} type="h5" className={classes.inputText}>
            Drop it here
          </StyledTypography>
        </>
      );
    }

    if (uploaded) {
      return (
        <>
          <StyledTypography fontSize={20} type="h5" className={classes.inputText}>
            Your file is uploaded, click next to proceed
          </StyledTypography>
        </>
      );
    }

    if (uploading) {
      return <CircularProgress size={70} />;
    }

    if (isReadyToUpload()) {
      return (
        <>
          <StyledTypography fontSize={20} type="h5" className={classes.inputText}>
            Your file is ready to upload
          </StyledTypography>
          <StyledTypography className={classes.inputNote}>
            Drag and Drop or Click to upload different file
          </StyledTypography>
        </>
      );
    }

    return (
      <>
        <img className={classes.inputIcon} src={uploadIcon} alt="upload" />
        <StyledTypography fontSize={20} type="h5" className={classes.inputText}>
          Drag and Drop or Click to upload resume
        </StyledTypography>
        <StyledTypography className={classes.inputNote}>*max upload size is 10MB</StyledTypography>
      </>
    );
  };

  return (
    <div className={classes.root}>
      <StepHeader title="Upload Your Resume" step={1} />
      <form className={classes.form} onSubmit={handleSubmit}>
        <Box className={clsx(classes.inputContainer, isDragActive && classes.inputDragActive)} {...getRootProps()}>
          <input {...getInputProps()} />
          {renderMessage()}
        </Box>
        <Box className={classes.actions}>
          <Box className={classes.buttonGroup}>
            <StyledButton
              onClick={() => history.push('/freelancer-application/tax-skills')}
              size="small"
              disabled={!uploaded || uploading}
              textTransform="uppercase"
              variant="dark-blue"
            >
              Next
            </StyledButton>
            <StyledButton
              size="small"
              textTransform="uppercase"
              variant="yellow"
              style={{ marginLeft: '10px' }}
              disabled={!isReadyToUpload() || uploading}
              type="submit"
            >
              Upload
            </StyledButton>
          </Box>
          <StyledTypography>File selected: {isReadyToUpload() ? acceptedFiles[0].name : '(none)'}</StyledTypography>
        </Box>
      </form>
    </div>
  );
}

export default Resume;
