import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Nav extends Component {
   logoutUser = (e) => {
    e.preventDefault();
    localStorage.removeItem("mernToken");
    this.props.refreshUser();
  }
  componentDidMount(){
    console.log(this.props.user)

  }
  render(){
    let links;
    if (this.props.user) {
      links =(
        <div>
          <span>
            <Link to={{
              pathname: "/messages",
              state: {
                user: this.props.user
              }}} className="nav-button">Messages</Link>
          </span>
          <span>
            <Link to={{
              pathname: "/profile",
              state: {
                user: this.props.user
              }
            }} className="nav-button">Profile</Link>
          </span>
          <span>
            <a href="/" onClick={this.logoutUser} className="nav-button">Logout</a>
          </span>
        </div>
        )
    }
    else if (!this.props.user){
      links = (
        <div>
          <span>
            <Link to="/login" className="nav-button">Login</Link>
          </span>
          <span>
            <Link to="/signup" className="nav-button">Signup</Link>
          </span>
        </div>
      )
    }
    return(
      <div className="navigation">
        <nav>
            <span className="logo">
              <Link to="/">
                <img src="/images/logo-white.png" alt="MunchMyLawn logo" width="100%"/>
              </Link>
            </span>
          <div>
          </div>
          <span>
            <Link to={{
              pathname: "/browse",
              state: {
                user: this.props.user
              }}} className="nav-button">Browse</Link>
          </span>
        {links}
        </nav>
      </div>
    );
  }
}

export default Nav;
