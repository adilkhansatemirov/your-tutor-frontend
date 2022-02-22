import { List, Box, makeStyles } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import CheckboxListItem from 'components/FreelancerApplication/CheckboxListItem';

const clone = require('rfdc')();

const useStyles = makeStyles(() => ({
  list: {
    marginTop: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    overflowY: 'auto',
    marginBottom: '20px',
  },
  listItem: {
    minWidth: '200px',
    width: '33%',
    padding: '0 12px',
    marginBottom: '10px',
  },
}));

function Skills({
  skillsOfCategory,

  allSkills,
  setAllSkills,

  skillsToCreate,
  skillsToDelete,
  setSkillsToCreate,
  setSkillsToDelete,
}) {
  const classes = useStyles();

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

    const updatedSkills = clone({ ...allSkills });
    updatedSkills[skillToUpdate.category][skillToUpdate.sub_category] = updatedSkills[skillToUpdate.category][
      skillToUpdate.sub_category
    ].map((skill) => (skill.id === skillToUpdate.id ? { ...skill, checked: !skill.checked } : skill));
    setAllSkills(updatedSkills);
  };

  const renderSkills = () => {
    const skillsToRender = [];
    for (const subCategoryName in skillsOfCategory) {
      skillsToRender.push({
        subCategoryName,
        skills: skillsOfCategory[subCategoryName],
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
    <Box style={{ marginTop: '20px' }} display="flex" flexDirection="column">
      {renderSkills()}
    </Box>
  );
}

export default Skills;
