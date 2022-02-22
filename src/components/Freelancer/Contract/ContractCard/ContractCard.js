import React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './ContractCard.style';
import StyledTypography from 'components/Shared/Styled/StyledTypography';
import FastIcon from 'components/Shared/Utils/FastIcon';

function ContractCard({ contract }) {
  const classes = useStyles();

  return (
    <Link className={classes.root} to={`/freelancer/contracts/${contract.id}`} style={{ textDecoration: 'none' }}>
      <StyledTypography weight="bold" className={classes.companyName}>
        {contract.client_detail.company_name}
      </StyledTypography>
      <StyledTypography color="white" weight="bold" className={classes.title}>
        {contract.title}
        <FastIcon iconName="arrow-right-white" className={classes.arrowRight} />
      </StyledTypography>
    </Link>
  );
}

export default ContractCard;
