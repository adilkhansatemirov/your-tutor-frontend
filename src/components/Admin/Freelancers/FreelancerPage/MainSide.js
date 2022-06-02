import Box from '@material-ui/core/Box';
import InfoBox from 'components/Shared/UI/InfoBox';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import { makeStyles, Table, TableBody, TableHead } from '@material-ui/core';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import { capitalize, removeUnderscores } from 'utils/common';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import checkWhiteIcon from 'assets/icons/check-white.svg';

const useStyles = makeStyles((theme) => ({
  skillItem: {
    width: '50%',
    marginBottom: '13px',
  },
  skillIcon: {
    marginRight: '10px',
    borderRadius: '50%',
    minWidth: 20,
    height: 20,
    border: 'none',
    backgroundColor: theme.palette.bluishBlack,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  skillText: {
    maxWidth: '220px',
  },
}));

function MainSide({ freelancer }) {
  const classes = useStyles();
  return (
    <Box style={{ width: '70%', marginRight: '26px' }}>
      {freelancer.skills.map((skillCategory) => (
        <InfoBox key={`id-${skillCategory.name}`}>
          <StyledTypography style={{ marginBottom: '15px' }} fontFamily="Rubik" fontSize={17} fontWeight="medium">
            {skillCategory.name}
          </StyledTypography>
          <Box display="flex" flexWrap="wrap">
            {skillCategory.list.map((skill) => (
              <Box key={skill.id} display="flex" alignItems="center" className={classes.skillItem}>
                <Box className={classes.skillIcon}>
                  <img src={checkWhiteIcon} alt="check icon" style={{ width: '12px' }} />
                </Box>
                <StyledTypography className={classes.skillText} noWrap fontFamily="Rubik" fontSize={15}>
                  {skill.skill}
                </StyledTypography>
              </Box>
            ))}
          </Box>
        </InfoBox>
      ))}

      {freelancer.projects.length > 0 && (
        <Table style={{ marginBottom: '60px' }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Projects</StyledTableCell>
              <StyledTableCell>Client</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {freelancer.projects.map((project) => (
              <StyledTableRow key={project.id}>
                <StyledTableCell>
                  <Link to={`/admin/projects/${project.id}`} style={{ textDecoration: 'none' }}>
                    <StyledTypography color="skyBlue" fontWeight="bold" fontSize={12} type="h6">
                      {project.title}
                    </StyledTypography>
                  </Link>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTypography fontSize={14} fontWeight="bold">
                    {`${project.student_detail.first_name} ${project.student_detail.last_name}`}
                  </StyledTypography>
                  <StyledTypography fontSize={12}>{project.student_detail.email}</StyledTypography>
                  <StyledTypography fontSize={12}>{project.company_name}</StyledTypography>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTypography fontSize={12} type="h6">
                    {capitalize(removeUnderscores(project.type))}
                  </StyledTypography>
                </StyledTableCell>
                <StyledTableCell>
                  <StyledTypography fontSize={12} type="h6">
                    <NumberFormat
                      prefix="₸"
                      value={Number(project.amount)}
                      decimalScale={2}
                      fixedDecimalScale={true}
                      displayType="text"
                      thousandSeparator={true}
                    />
                  </StyledTypography>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
}

export default MainSide;
