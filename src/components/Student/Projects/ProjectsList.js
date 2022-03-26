import { useContext, useEffect, useState } from 'react';
import { Box, Table, TableBody, TableHead } from '@material-ui/core';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import PageHeader from 'components/Shared/UI/PageHeader';
import { getProjects } from 'services/client/projects';
import { SnackbarContext } from 'context/snackbarContext';
import PageLoader from 'components/Shared/Utils/PageLoader';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import ProjectsListItem from './ProjectsListItem';
import StyledButton from 'components/Shared/Styled/StyledButton';
import { Link } from 'react-router-dom';
// import TableCellSortArrows from 'components/Shared/Utils/TableCellSortArrows';

function ProjectsList() {
  const { showSnackbar } = useContext(SnackbarContext);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line
  }, []);

  const fetchProjects = (params) => {
    getProjects(params)
      .then((response) => {
        setProjects(response.data.list);
        setLoading(false);
      })
      .catch(() => {
        showSnackbar('Something went wrong', 'error');
        setLoading(false);
      });
  };

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Rubik" fontWeight="bold" fontSize={20}>
            Projects
          </StyledTypography>
          <Link to={`/client/projects/new`} style={{ textDecoration: 'none' }}>
            <StyledButton textTransform="uppercase" variant="light-blue" size="small">
              New Project
            </StyledButton>
          </Link>
        </Box>
      </PageHeader>
      {loading ? (
        <PageLoader />
      ) : (
        <Table>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell
              //   onClick={() => handleChangeSortParams('projects.title')}
              >
                <Box display="flex" alignItems="center">
                  Project
                  {/* <TableCellSortArrows
                    sortKey="projects.title"
                    currentSortKey={params.sort_key}
                    currentSortDirection={params.sort_direction}
                  /> */}
                </Box>
              </StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <ProjectsListItem key={project.id} project={project} />
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}

export default ProjectsList;
