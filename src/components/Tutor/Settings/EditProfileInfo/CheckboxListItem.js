import { FormControlLabel, ListItem } from '@material-ui/core';
import StyledCheckbox from 'components/Shared/Styled/StyledCheckbox';
import React from 'react';

class CheckboxListItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.skill.checked !== nextProps.skill.checked;
  }

  render() {
    const { skill } = this.props;

    return (
      <ListItem style={{ minWidth: '200px', width: '300px', padding: 0, paddingLeft: '11px', marginBottom: '10px' }}>
        <FormControlLabel
          control={
            <StyledCheckbox
              checked={skill.checked}
              onChange={() => this.props.handleUpdateSkill(skill, !skill.checked)}
              name={skill.skill}
            />
          }
          label={skill.skill}
        />
      </ListItem>
    );
  }
}

export default CheckboxListItem;
