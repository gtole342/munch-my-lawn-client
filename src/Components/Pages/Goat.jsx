import React, { Component } from 'react';
import Calendar from '../Subcomponents/Calendar';
import Reviews from '../Subcomponents/Reviews';
import axios from 'axios'
import {Link} from 'react-router-dom'
import {CREATE_APPOINTMENT, GET_GOATS_APPOINTMENTS, SERVER } from '../../constants'
class Goat extends Component {
  state = {
    date: '',
    goatId: '',
    goatName: '',
    clientId: '',
    location: '',
    appointments: [], 
    user: this.props.location.state.user,
    redirect: false
  }
  
  componentDidMount() {
    console.log(this.props)
    let goatId
    let goatName
    if (!this.props.location.state) {
      const goat = this.getCurrentGoat()
      goatId = goat.id
      goatName = goat.name

    } else {
      goatId = this.props.location.state.goat._id
      goatName = this.props.location.state.goat._id
    }
    this.setState({
      goatId,
      goatName,
      clientId: this.props.location.state.user
    })
    // this.getAppointments()
  }

  getCurrentGoat = () => {
  axios.get(SERVER + `/goat/${this.state.goatId}`)
    .then(response => {
      // console.log(response.data.user)
      this.setState({
        id: response.data.user._id,
        name: response.data.user.firstname,
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

  getAppointments = () => {
    axios.get(GET_GOATS_APPOINTMENTS)
    .then(response => {
      //console.log(response.data)
      this.setState({appointments: response.data})
    })
  }

  submitAppointments = (e) => {
    e.preventDefault()
    axios.post(CREATE_APPOINTMENT, this.state)
    .then(response => {
    })
    .catch(err => {
      console.log('Error in the create Appointment route', err)
    })
  }

  render() {

    return(
      <div className="goat">
        <div className="view-goat">
          <div className="goat-image-container">
            <img src={this.props.location.state.goat.profilePic} 
                alt={this.props.location.state.goat.firstname}
                className="goat-profile-img"
            />
          </div>
          <div>
            <Calendar 
              appointments={this.props.location.state.goat.appointments}
              clientId={this.props.location.state.user}
              goatId={this.props.location.state.goat._id}
            />
            <Link to={{
              pathname: '/messages',
              state: {recipient: this.state.goatId,
                      user: this.props.location.state.user
                    }
            }}>
              <div id="want-to-chat">
              <h2>Want To Chat?</h2>
              </div>
            </Link>
          </div>
        </div>
        <div className = "review-container">
          <Reviews user={this.state.user} goat={this.props.location.state.goat}/>
        </div>
      </div>

    );
  }
}

export default Goat;