import React, { Component, Suspense } from 'react';
import Appointments from '../Subcomponents/Appointments'
import { Redirect } from 'react-router-dom'

class Profile extends Component {

  componentDidMount() {
    this.props.refreshUser()
  }

  render(){
    if (!this.props.user) {
      return(<Redirect to='/' />)
    }
    return(
      <div>
        <div className='profile-container'>
          <div className='profile-container-left'>
            <h2>{this.props.user.firstname}, {this.props.user.lastname}</h2>
            <h2>{this.props.user.email}</h2>
          </div>
          <div className='profile-countainer-right' >
            <Appointments
              user={this.props.user}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
