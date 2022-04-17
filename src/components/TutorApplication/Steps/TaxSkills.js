import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { List, makeStyles, Box, CircularProgress } from '@material-ui/core';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { getSkills, updateSkills } from 'services/freelancer/skills';
import StepHeader from '../StepHeader';
import { SnackbarContext } from 'context/snackbarContext';
import { formatSkills } from 'utils/skills';
import { skillsCategories } from 'constants/constants';

import arrowLeftIcon from 'assets/icons/arrow-left.svg';
import theme from 'theme';
import CheckboxListItem from '../CheckboxListItem';

const useStyles = makeStyles(() => ({
  container: {
    minHeight: '100%',
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    minHeight: '100%',
    marginTop: '10px',
    overflowY: 'auto',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    overflowY: 'auto',
    marginBottom: '20px',
  },
  previousStepButton: {
    background: 'transparent',
    fontWeight: 500,
    '&:hover': {
      background: 'transparent',
    },
  },
}));

function TaxSkills() {
  const classes = useStyles();
  const history = useHistory();

  const { showSnackbar } = useContext(SnackbarContext);
  const [freelancerSkills, setFreelancerSkills] = useState([]);
  const [skillsToCreate, setSkillsToCreate] = useState([]);
  const [skillsToDelete, setSkillsToDelete] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line
  }, []);

  const fetchSkills = async () => {
    getSkills(skillsCategories.tax)
      .then((response) => {
        const formatterSkills = formatSkills(response.data.freelancer_skills, response.data.skills);
        setFreelancerSkills(formatterSkills);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        showSnackbar('Something went wrong', 'error');
      });
  };

  const handleUpdateSkill = (skillToUpdate, checked) => {
    if (checked === true) {
      const skillToDelete = skillsToDelete.find((skill) => skillToUpdate.id === skill.id);
      if (skillToDelete) setSkillsToDelete(skillsToDelete.filter((skill) => skill.id !== skillToUpdate.id));
      else setSkillsToCreate([...skillsToCreate, skillToUpdate]);
    }

    if (checked === false) {
      const skillToCreate = skillsToCreate.find((skill) => skillToUpdate.id === skill.id);
      if (skillToCreate) setSkillsToCreate(skillsToCreate.filter((skill) => skill.id !== skillToUpdate.id));
      else setSkillsToDelete([...skillsToDelete, skillToUpdate]);
    }

    const updatedFreelancerSkills = { ...freelancerSkills };
    updatedFreelancerSkills[skillToUpdate.sub_category] = updatedFreelancerSkills[
      skillToUpdate.sub_category
    ].map((skill) => (skill.id === skillToUpdate.id ? { ...skill, checked: !skill.checked } : skill));
    setFreelancerSkills(updatedFreelancerSkills);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (skillsToCreate.length || skillsToDelete.length) {
      setSubmitting(true);
      updateSkills({ skills_to_update: { skills_to_create: skillsToCreate, skills_to_delete: skillsToDelete } })
        .then(() => {
          setSubmitting(false);
          history.push('/freelancer-application/bookkeeping-skills');
        })
        .catch(() => {
          showSnackbar('Something went wrong', 'error');
          setSubmitting(false);
        });
    } else {
      history.push('/freelancer-application/bookkeeping-skills');
    }
  };

  const renderSkills = () => {
    const skillsToRender = [];
    for (const subCategoryName in freelancerSkills) {
      skillsToRender.push({
        subCategoryName,
        skills: freelancerSkills[subCategoryName],
      });
    }
    return skillsToRender.map(({ subCategoryName, skills }) => (
      <Box key={subCategoryName}>
        <StyledTypography fontSize={18} type="h4" fontWeight="bold">
          {subCategoryName}
        </StyledTypography>
        <List className={classes.list}>
          {skills.map((skill) => (
            <CheckboxListItem key={skill.id} skill={skill} handleUpdateSkill={handleUpdateSkill} />
          ))}
        </List>
      </Box>
    ));
  };

  return (
    <div className={classes.container}>
      <StepHeader title="Tax Skills" step={2} />
      <form className={classes.form} onSubmit={handleSubmit}>
        <Box style={{ overflowY: 'auto', marginBottom: '34px', flex: 1 }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            renderSkills()
          )}
        </Box>

        <Box display="flex" justifyContent="space-between">
          <StyledButton disabled={submitting} size="small" variant="dark-blue" textTransform="uppercase" type="submit">
            Next
          </StyledButton>
          <StyledButton
            type="button"
            onClick={() => history.push('/freelancer-application/resume')}
            className={classes.previousStepButton}
          >
            <img style={{ marginRight: '10px' }} src={arrowLeftIcon} alt="arrow-left" />{' '}
            <StyledTypography fontSize={14} style={{ color: theme.palette.textGray }}>
              Previous Step
            </StyledTypography>
          </StyledButton>
        </Box>
      </form>
    </div>
  );
}

export default TaxSkills;
