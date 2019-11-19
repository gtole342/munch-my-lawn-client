import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

class Home extends Component {
  
  state = {
    redirect: false, 
    ping: false
  }

  componentDidMount() {
    this.setPingState(this.state.ping);
    this.pingMyServer(this.state.ping);
  }

  setPingState = (pingState) => {
    if(pingState === false) {
      this.setState({
        ping: true
      })
    }
    else {
      this.setState({
        ping: false
      })
    }
  }

  pingMyServer = (pingState) => {
    let http = require('http');
    let pingInterval = setInterval(() => {
      http.get('https://mmlserver.herokuapp.com/')
    }, 900000);
    if(pingState === true) {
      pingInterval();
    } else {
      clearInterval(pingInterval)
    }
  }

  handleSubmit = () => {
    this.setState({
      redirect: true
    })
  }
  render(){

    if (this.state.redirect === true) {
      return (
        <Redirect to='/browse'/>
      )
    }
    return(
      <div>
        <div className="bg-video">
          <video className="bg-video__content" autoPlay muted loop>
            <source src="/zip_Go-Goat/MP4/Go-Goat.mp4" type="video/mp4" />
            <source src="/zip_Go-Goat/WEBM/Go-Goat.webm" type="video/webm" />
            your browser does not support a video tag
          </video>
          <div className="header-container">
            <div className="header-content">
              <h1 className="header-main">Hire a goat for your horticultural needs</h1>
              <button className="btn btn-white" type="submit" onClick={this.handleSubmit}>See Local Goats</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
