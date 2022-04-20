import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Box,
  Divider,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import StyledButton from 'components/Shared/Styled/StyledButton';
import Resume from './Resume';
import Skills from './Skills';
import PageLoader from 'components/Shared/Utils/PageLoader';
import FreelancerPreferences from './FreelancerPreferences';
import { uploadResume, getFreelancer } from 'services/admin/freelancers';
import { getFreelancerSkills, updateFreelancerSkills } from 'services/admin/skills';
import { updateFreelancerDetails } from 'services/admin/freelancers';
import { SnackbarContext } from 'context/snackbarContext';
import PageHeader from 'components/Shared/UI/PageHeader';
import { useDropzone } from 'react-dropzone';
import { megabyte } from 'constants/constants';
import arrowDownIcon from 'assets/icons/arrow-down.svg';
import { formatFreelancerSkills } from 'utils/skills';

const useStyles = makeStyles((theme) => ({
  collapseWrapper: {
    marginBottom: '25px',
    background: theme.palette.white,
    border: `1px solid ${theme.palette.silverGray.main}`,
    boxSizing: 'border-box',
    borderRadius: '5px',
    '&:before': {
      backgroundColor: 'transparent',
    },
  },
  collapseTrigger: {
    height: '62px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    cursor: 'pointer',
  },
  details: {
    padding: '0 20px 20px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function EditFreelancer() {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const { showSnackbar } = useContext(SnackbarContext);
  const { freelancerId } = useParams();

  const [freelancer, setFreelancer] = useState(null);
  const [freelancerDetails, setFreelancerDetails] = useState(null);

  const [skills, setSkills] = useState([]);
  const [skillsToCreate, setSkillsToCreate] = useState([]);
  const [skillsToDelete, setSkillsToDelete] = useState([]);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
    getFilesFromEvent: (event) => handleResumeFileInputChange(event),
    maxSize: 10 * megabyte,
  });

  const handleResumeFileInputChange = (event) => {
    const files = [];
    const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    for (var i = 0; i < fileList.length; i++) {
      const file = fileList.item(i);
      files.push(file);
    }
    return files;
  };

  const history = useHistory();

  useEffect(() => {
    const fetch = async () => {
      try {
        const freelancerResponse = await getFreelancer(freelancerId);
        setFreelancer(freelancerResponse.data);
        setFreelancerDetails({
          id: freelancerResponse.data.freelancer_detail.id,
          desired_hourly_rate: freelancerResponse.data.freelancer_detail.desired_hourly_rate,
          work_hours_per_week: freelancerResponse.data.freelancer_detail.work_hours_per_week,
        });
        const skillsResponse = await getFreelancerSkills(freelancerId);
        setSkills(formatFreelancerSkills(skillsResponse.data.freelancer_skills, skillsResponse.data.skills));
        setLoading(false);
      } catch (error) {
        showSnackbar('Something went wrong', 'error');
        setLoading(false);
      }
    };
    fetch();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      await updateFreelancerDetails(freelancerDetails);
      if (acceptedFiles[0]) {
        setUploadingResume(true);
        showSnackbar('Resume upload has started', 'info');

        let formData = new FormData();
        formData.set('user_id', freelancerId);
        formData.append('resume', acceptedFiles[0]);

        await uploadResume(formData);
        setUploadingResume(false);
      }
      if (skillsToCreate.length || skillsToDelete.length) {
        await updateFreelancerSkills(freelancer.id, {
          skills_to_update: { skills_to_create: skillsToCreate, skills_to_delete: skillsToDelete },
        });
      }
      setLoading(false);
      showSnackbar('Freelancer details has been updated', 'success');
      history.push(`/admin/freelancers/${freelancer.id}`);
    } catch (error) {
      showSnackbar('Something went wrong', 'error');
      console.error(error);
    }
  };

  const renderSkills = () => {
    const skillsToRender = [];
    for (const categoryName in skills) {
      skillsToRender.push({
        categoryName,
        skills: skills[categoryName],
      });
    }
    return skillsToRender.map((skillsOfCategory) => (
      <Accordion elevation={0} className={classes.collapseWrapper} key={skillsOfCategory.categoryName}>
        <AccordionSummary
          expandIcon={<img src={arrowDownIcon} alt="arrow down" />}
          className={classes.collapseTrigger}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <StyledTypography type="h3" fontFamily="Rubik" fontSize={20} fontWeight="medium">
            {skillsOfCategory.categoryName}
          </StyledTypography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Divider />
          <Skills
            skillsOfCategory={skillsOfCategory.skills}
            allSkills={skills}
            setAllSkills={setSkills}
            skillsToCreate={skillsToCreate}
            setSkillsToCreate={setSkillsToCreate}
            skillsToDelete={skillsToDelete}
            setSkillsToDelete={setSkillsToDelete}
          />
        </AccordionDetails>
      </Accordion>
    ));
  };

  return loading ? (
    <PageLoader />
  ) : (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontWeight="medium" fontSize="22px" fontFamily="Rubik">
            {`${freelancer.first_name} ${freelancer.last_name}`}
          </StyledTypography>
          <StyledButton
            disabled={loading || submitting}
            type="submit"
            onClick={handleSubmit}
            textTransform="uppercase"
            variant="green"
            size="small"
          >
            Save
          </StyledButton>
        </Box>
      </PageHeader>
      <Accordion elevation={0} className={classes.collapseWrapper}>
        <AccordionSummary
          expandIcon={<img src={arrowDownIcon} alt="arrow down" />}
          className={classes.collapseTrigger}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" alignItems="center">
            <StyledTypography type="h3" fontFamily="Rubik" fontSize={20} fontWeight="medium">
              Resume
            </StyledTypography>
            {uploadingResume && <CircularProgress style={{ marginLeft: '10px' }} size={20} />}
          </Box>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Divider />
          <Resume
            uploadingResume={uploadingResume}
            acceptedFiles={acceptedFiles}
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            freelancerDetails={freelancer.freelancer_detail}
            userId={freelancerId}
          />
        </AccordionDetails>
      </Accordion>
      {renderSkills()}
      <Accordion elevation={0} className={classes.collapseWrapper}>
        <AccordionSummary
          expandIcon={<img src={arrowDownIcon} alt="arrow down" />}
          className={classes.collapseTrigger}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <StyledTypography type="h3" fontFamily="Rubik" fontSize={20} fontWeight="medium">
            Freelancer preferences
          </StyledTypography>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <Divider />
          {freelancerDetails && (
            <FreelancerPreferences freelancerDetails={freelancerDetails} setFreelancerDetails={setFreelancerDetails} />
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default EditFreelancer;
