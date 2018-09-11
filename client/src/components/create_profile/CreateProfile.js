import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state= {
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youotube: '',
      instagram: '',
      errors: {}
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log('submit')
  }

  render() {

    //Select option for status
    const options = [
      { label: '* Select Professional Status', value: 0},
      { label: 'Developer', value: 'Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];
    const { errors,displaySocialInputs } = this.state;
    let displaySocialInputs;
    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup 
            placeholder='Twitter profile URL'
            name= 'twitter'
            icon= 'fab fa-twitter'
            value= {this.state.twitter}
            onChange= {this.onChange}
            error= {errors.twitter}
          />
          <InputGroup 
            placeholder='Facebook profile URL'
            name= 'facebook'
            icon= 'fab fa-facebook'
            value= {this.state.facebook}
            onChange= {this.onChange}
            error= {errors.facebook}
          />
          <InputGroup 
            placeholder='Linkedin profile URL'
            name= 'linkedin'
            icon= 'fab fa-linkedin'
            value= {this.state.linkedin}
            onChange= {this.onChange}
            error= {errors.linkedin}
          />
          <InputGroup 
            placeholder='Youtube profile URL'
            name= 'youtube'
            icon= 'fab fa-youtube'
            value= {this.state.youtube}
            onChange= {this.onChange}
            error= {errors.youtube}
          />
          <InputGroup 
            placeholder='Instagram profile URL'
            name= 'instagram'
            icon= 'fab fa-instagram'
            value= {this.state.instagram}
            onChange= {this.onChange}
            error= {errors.instagram}
          />
        </div>
      )
    }

    return (
      <div className='create-profile'>
         <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'>Create Your Profile</h1>
              <p className='lead text-center'>Let`s get some information to make your profile stand out</p>
              <small className='d-block pb-3'>* = require fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup 
                  placeholder= '* Profile Handle'
                  name='handle'
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info='A unique handle for your profile URL. Your full name, Company name, nickname.'
                />
                <SelectListGroup 
                  placeholder= 'Status'
                  name='status'
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info='Give us an idea of where you are in your career'
                />
                <TextFieldGroup 
                  placeholder= 'Company'
                  name='company'
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info='Could be your owm company or one you work for'
                />
                <TextFieldGroup 
                  placeholder= 'Website'
                  name='website'
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info='Could be your own website or company one'
                />
                <TextFieldGroup 
                  placeholder= 'Location'
                  name='location'
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info='City or city & state suggested (eg. Boston, MA)'
                />
                <TextFieldGroup 
                  placeholder= '* Skills'
                  name='skills'
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info='Please use comma separated values (eg. HTML, CSS, JAVASCRIPT, PHP)'
                />
                <TextFieldGroup 
                  placeholder= 'Github Username'
                  name='githubusername'
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info='If you want your last repos and a Github link, include your username'
                />
                <TextAreaFieldGroup
                  placeholder= 'Short bio'
                  name='bio'
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info='Tell us a litlle about yourself'
                />
                <div className='mb-3'>
                  <button 
                    className='btn btn-light'
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))
                    }}
                    >
                      Add Social Network Links
                    </button>
                    <span className='text-muted'> Optional </span>
                </div>
                {socialInputs}
                <input 
                  type='submit'
                  value='Submit'
                  className='btn btn-info btn-block mt-4'
                />
              </form>
            </div>
          </div>
         </div>
      </div>
    )
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(null)(CreateProfile);