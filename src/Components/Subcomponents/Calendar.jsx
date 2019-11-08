import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import { SingleDatePicker  } from 'react-dates';
import moment from 'moment';
import axios from 'axios';
import { CREATE_APPOINTMENT } from '../../constants';

class Calendar extends Component {
  state = {
    date: null,
    focused: null
  }

  onSubmit = (e) => {
    e.preventDefault()
    axios.post(CREATE_APPOINTMENT, {
      clientId: this.props.clientId,
      goatId: this.props.goatId,
      date: this.state.date,
      location: ''
    })
    .then((response)=>{
      console.log(response)
    })
    .catch(err => {
      console.log('Uh oh ya goof', err)
    })
    }

  onDateChange = ( date ) => this.setState({ date })

  onFocusChange = ( focused ) => this.setState(focused)

  isDayBlocked = (day) => {
    if (this.props.appointments.length > 0) {
      return this.props.appointments.filter(d => moment(d).isSame(day, 'day')).length > 0
    }
    else {
      return false
    }
  }

  render() {
    console.log('These are the appointments', this.props.appointments)
    return (
      <div>
        <SingleDatePicker
          isDayBlocked={this.isDayBlocked}
          date={this.state.date}
          onDateChange={this.onDateChange}
          focused={this.state.focused}
          onFocusChange={this.onFocusChange}
          id="calendar"
        />
        <form onSubmit={this.onSubmit}>
          <input type="submit" value="Book Goat"></input>
        </form>
      </div>
    );
  }
}

export default Calendar;