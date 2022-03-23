import { useState, useEffect, useContext } from 'react';
import { Box, TableHead, TableBody, Table, FormControl, MenuItem, InputAdornment } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import StyledTableCell from 'components/Shared/Styled/StyledTableCell';
import StyledSelect from 'components/Shared/Styled/StyledSelect';
import StyledButton from 'components/Shared/Styled/StyledButton';
import StyledTableRow from 'components/Shared/Styled/StyledTableRow';
import ProjectsListItem from '../ProjectsListItem/ProjectsListItem';
// import { SnackbarContext } from 'context/snackbarContext';
// import { getProjects } from 'services 'services/admin/projects';
import PageLoader from 'components/Shared/Utils/PageLoader';
import PageHeader from 'components/Shared/UI/PageHeader';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
// import StatusCounter from '../../../Shared/UI/StatusCounter';
import StyledTextField from 'components/Shared/Styled/StyledTextField';
import FastIcon from 'components/Shared/Utils/FastIcon';
import InfiniteScroll from 'react-infinite-scroll-component';
import TableCellSortArrows from 'components/Shared/Utils/TableCellSortArrows';
// import { useFilter, usePagination, useSearch, useSort } from 'hooks';
import axios from 'axios';

function ProjectsList() {
  const history = useHistory();

  // const { // showSnackbar } = useContext(SnackbarContext);

  const [loading, setLoading] = useState(true);
  const [counters, setCounters] = useState(null);
  const [pagination, setPagination] = useState(null);

  const [projects, setProjects] = useState([]);

  const [params, setParams] = useState({ page: 1, sort_key: null, sort_direction: null });

  useEffect(() => {
    fetchProjects(params);
    // eslint-disable-next-line
  }, []);

  const fetchProjects = (params, cancelToken) => {
    // getProjects(params, cancelToken)
    //   .then((response) => {
    //     setCounters(response.data.meta.counters);
    //     setPagination(response.data.meta.pagination);
    //     setProjects(response.data.list);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     if (axios.isCancel(error)) {
    //       console.log('Operation canceled due to new request');
    //     } else {
    //       // showSnackbar('Something went wrong', 'error');
    //     }
    //     setLoading(false);
    //   });
  };

  const handleCreateProject = () => {
    history.push('/admin/projects/new');
  };

  // const fetchMore = usePagination({
  //   pagination,
  //   setPagination,
  //   params,
  //   setParams,
  //   data: projects,
  //   getData: getProjects,
  //   setData: setProjects,
  //   setLoading,
  //   setCounters,
  // });

  // const handleSearch = useSearch({
  //   params,
  //   setParams,
  //   setLoading,
  //   fetchData: fetchProjects,
  // });

  // const { filterValue, handleFilterChange } = useFilter({
  //   params,
  //   setParams,
  //   fetchData: fetchProjects,
  //   filterBy: 'project_status',
  // });

  // const handleChangeSortParams = useSort({ params, setParams, fetchData: fetchProjects });

  return (
    <>
      <PageHeader>
        <Box display="flex" justifyContent="space-between">
          <StyledTypography fontFamily="Roboto" fontWeight="bold" fontSize={20}>
            LESSONS
          </StyledTypography>
          <StyledButton style={{borderRadius: 20, boxShadow: '0px 10px 13px rgba(15, 44, 76, 0.13)' }}  variant="yellow" onClick={handleCreateProject}>
            <StyledTypography fontSize={18} fontWeight="normal">
              Create a lesson
            </StyledTypography>
          </StyledButton>
        </Box>
      </PageHeader>
      {/* <Box display="flex" justifyContent="space-between" style={{ marginBottom: '27px' }}>
        <Box display="flex">
          <StatusCounter label="Accepting Bids" count={counters?.accepting_bids_count} color="orange" />
          <StatusCounter label="Active" count={counters?.active_count} color="green" />
          <StatusCounter label="Inactive" count={counters?.inactive_count} color="tomatoRed" />
          <StatusCounter label="Error" count={counters?.error_count} color="tomatoRed" />
        </Box>
        <Box>
          <StyledTextField
            placeholder="Search projects..."
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FastIcon width="17" height="18" iconName="search" />
                </InputAdornment>
              ),
            }}
            small
            fontFamily="Poppins"
          />
          <FormControl variant="outlined">
            <StyledSelect
              placeholder="Filter by"
              onChange={handleFilterChange}
              value={filterValue}
              style={{ marginLeft: '30px', width: '250px' }}
              small
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="accepting_bids">Accepting bids</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="error">Error</MenuItem>
              <MenuItem value="assigning_freelancer">Assigning freelancer</MenuItem>
            </StyledSelect>
          </FormControl>
        </Box>
      </Box>
      {loading ? (
        <PageLoader />
      ) : (
        <InfiniteScroll
          dataLength={projects.length}
          next={fetchMore}
          hasMore={pagination.page < pagination.num_pages}
          loader={
            <StyledTypography align="center" style={{ margin: '20px 0', opacity: 0.5 }}>
              Loading..
            </StyledTypography>
          }
          endMessage={
            <StyledTypography align="center" style={{ margin: '20px 0', opacity: 0.5 }}>
              The end of the list
            </StyledTypography>
          }
        >
        */}
          <Table>
            <colgroup>
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
            <TableHead>
              <StyledTableRow>
                {/* <StyledTableCell onClick={() => handleChangeSortParams('projects.title')}> */}
                <StyledTableCell>
                  <Box display="flex" alignItems="center">
                    Lesson
                    {/* <TableCellSortArrows
                      sortKey="projects.title"
                      currentSortKey={params.sort_key}
                      currentSortDirection={params.sort_direction}
                    /> */}
                  </Box>
                </StyledTableCell>
                {/* <StyledTableCell onClick={() => handleChangeSortParams('clients.first_name')}> */}
                <StyledTableCell>
                  <Box display="flex" alignItems="center">
                    Student
                    {/* <TableCellSortArrows
                      sortKey="clients.first_name"
                      currentSortKey={params.sort_key}
                      currentSortDirection={params.sort_direction}
                    /> */}
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                //  onClick={() => handleChangeSortParams('freelancers.first_name')}
                >
                  <Box display="flex" alignItems="center">
                    Tutor
                    {/* <TableCellSortArrows
                      sortKey="freelancers.first_name"
                      currentSortKey={params.sort_key}
                      currentSortDirection={params.sort_direction}
                    /> */}
                  </Box>
                </StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <ProjectsListItem key={project.id} project={project} />
              ))}
            </TableBody>
          </Table>
        {/* </InfiniteScroll>
      )} */}
    </>
  );
}

export default ProjectsList;
