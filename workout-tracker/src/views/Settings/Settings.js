import React from 'react';
import { connect } from 'react-redux';
import { fetchSettings, updateSettings } from '../../store/actions/settingActions';
import styled from 'styled-components';

const StyledSettings = styled.div``;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount = () => {

  };
  
  render() { 
    return ( 
      <StyledSettings>

      </StyledSettings>
     );
  }
}

const mapStateToProps = state => {
  return {
// settings: state.settings.settings,
  };
};
 
export default connect(mapStateToProps, { fetchSettings, updateSettings })(Settings);