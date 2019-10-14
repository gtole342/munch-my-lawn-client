import React, { Component } from 'react';
import moment from 'moment';
import Calendar from '../Subcomponents/Calendar';
import Reviews from '../Subcomponents/Reviews';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {CREATE_APPOINTMENT, GET_GOATS_APPOINTMENTS, SERVER, LOCALHOST} from '../../constants'
class Goat extends Component {
  state = {
    date: '',
    goatId: "",
    goatName: '',
    clientId: '',
    location: '',
    appointments: [], 
    user: this.props.user,
    redirect: false
  }
  
  componentDidMount() {
    console.log(this.props)
    this.getCurrentGoat();
    this.getAppointments()
    
  }

  getCurrentGoat = () => {
  axios.get(SERVER + `/goat/${this.props.goatId}`)
    .then(response => {
      console.log(response.data.user)
      this.setState({
        goatId: response.data.user._id
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: `/messages`,
        state: { recipient: this.props.goatId, user: this.props.user }
      }} />
    }
  }

  getAppointments = () => {
    axios.get(GET_GOATS_APPOINTMENTS)
    .then(response => {
      console.log(response.data)
      this.setState({appointments: response.data})
    })
  }

  submitAppointments = (e) => {
    e.preventDefault()
    axios.post(CREATE_APPOINTMENT, this.state)
    .then(response => {
      console.log("Appointment created with", this.state)
    })
    .catch(err => {
      console.log('Error in the create Appointment route', err)
    })
  }

  
  render() {


    return(
      <div className="goat">
        <div className='profile-container-left'>
          {/* <h2>{this.props.user.firstname}</h2>
          <h2>{this.props.user.lastname}</h2>
          <h2>{this.props.user.email}</h2> */}
        </div>
        <Calendar appointments={[moment(), moment().add(10, 'days')]} />
        <Reviews />
        <div>
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="submit-chat">Chat with me!</label>
            <input className="btn" type="submit"/>
          </form>
          {this.renderRedirect()}
        </div>
      </div>
    );
  }
}

export default Goat;
