import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TextFieldGroup } from '../common/TextFieldGroup';
import { TextAreaFieldGroup } from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class AddExperience extends Component {
  constructor(props){
    super(props);
    this.state = {
      company: '',
      title: '',
      location: '',
      from: '',
      to: '',
      current: false,
      discription: '',
      errors: {},
      disabled: false

    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className='add-experience'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <Link to='/dashboard' className='btn btn-light'>Go back</Link>
              <h1 className='display-4 text-center'>Add Experience</h1>
              <p className='text-lead text-center'>Add eny job or position that you have had in the past or current</p>
              <small className='d-block pb-3'>* = required fields</small>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddExperience));
