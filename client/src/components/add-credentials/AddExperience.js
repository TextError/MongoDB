import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
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

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.state.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    console.log('submited')
  }

  onCheck = (e) => {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
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
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder = '* Company'
                  name = 'company'
                  value = {this.state.company}
                  onChange = {this.onChange}
                  errors = {errors.company}
                />
                <TextFieldGroup 
                  placeholder = '* Job Title'
                  name = 'title'
                  value = {this.state.title}
                  onChange = {this.onChange}
                  errors = {errors.title}
                />
                <TextFieldGroup 
                  placeholder = 'Location'
                  name = 'location'
                  value = {this.state.location}
                  onChange = {this.onChange}
                  errors = {errors.location}
                />
                <h6>From Date</h6>
                <TextFieldGroup 
                  name = 'from'
                  type = 'date'
                  value = {this.state.from}
                  onChange = {this.onChange}
                  errors = {errors.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup 
                  name = 'company'
                  type = 'date'
                  value = {this.state.to}
                  onChange = {this.onChange}
                  errors = {errors.to}
                  disabled = { this.state.disabled ? 'disabled' : ''}
                />
                <div className='form-check mb-4'>
                  <input 
                    type = 'checkbox'
                    className = 'form-check-input'
                    name = 'current'
                    value = {this.state.current}
                    checked = {this.state.current}
                    onChange = {this.onCheck}
                    id = 'current'
                  />
                  <label 
                    className='form-check-label'
                    htmlFor = 'current'
                    >
                    Current Job
                  </label>
                </div>
                <TextAreaFieldGroup 
                  placeholder = 'Job Discription'
                  name = 'discription'
                  value = {this.state.discription}
                  onChange = {this.onChange}
                  errors = {errors.discription}
                  info = 'Tell us about the position'
                />
                <input
                  type = 'submit'
                  value = 'Submit'
                  className = 'btn btn-info btn-block mt-4'
                />
              </form>
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
