import clsx from 'clsx';
import { Box, CircularProgress, makeStyles } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import documentIcon from 'assets/icons/document.png';
import uploadIcon from 'assets/icons/upload.png';

const useStyles = makeStyles((theme) => ({
  fileName: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '10px',
  },
  inputContainer: {
    padding: '20px',
    borderRadius: '5px',
    border: `1px dashed ${theme.palette.bluishBlack}`,
    backgroundColor: theme.palette.coldWhite,
    outline: 'none',
    transition: 'border .24s ease-in-out',
    marginBottom: '20px',
    cursor: 'pointer',
  },
  inputDragActive: {
    border: '1px solid black',
    '& $inputIcon': {
      transform: 'rotate(180deg)',
    },
  },
  inputIcon: {
    width: '100px',
    marginBottom: '20px',
    transition: 'all 0.3s',
  },
}));

function Resume({ acceptedFiles, getRootProps, getInputProps, isDragActive, freelancerDetails, uploadingResume }) {
  const classes = useStyles();

  const isReadyToUpload = () => Boolean(acceptedFiles[0]);

  const renderMessage = () => {
    if (uploadingResume) return <CircularProgress size={50} />;

    if (isDragActive)
      return (
        <>
          <img className={classes.inputIcon} src={uploadIcon} alt="upload" />
          <StyledTypography type="h5" fontWeight="medium" align="center" fontSize={20}>
            Drop it here
          </StyledTypography>
        </>
      );

    if (isReadyToUpload()) {
      return (
        <>
          <StyledTypography fontSize={14} type="65" style={{ marginBottom: '10px' }}>
            File selected: {acceptedFiles[0].name}
          </StyledTypography>
          <StyledTypography fontSize={20} type="h5">
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
        <StyledTypography type="h5" fontWeight="medium" align="center" fontSize={20}>
          Drag and Drop or
          <br /> upload resume
        </StyledTypography>
      </>
    );
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" padding="30px 0">
        <img src={documentIcon} alt="document icon" />
        <StyledTypography
          fontFamily="Poppins"
          color="skyBlue"
          className={classes.fileName}
          type="h6"
          fontSize={16}
          fontWeight="bold"
        >
          {freelancerDetails.resume_url ? (
            <a href={freelancerDetails.resume_url} style={{ textDecoration: 'none' }} target="_blank" rel="noreferrer">
              {freelancerDetails.public_id}
            </a>
          ) : (
            'No resume attached'
          )}
        </StyledTypography>
      </Box>
      <Box>
        <form>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className={clsx(classes.inputContainer, isDragActive && classes.inputDragActive)}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {renderMessage()}
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Resume;
