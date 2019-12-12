import React, { Component } from 'react';
import axios from 'axios';
import Map from '../Subcomponents/Map';
import GoatDisplay from '../Subcomponents/GoatDisplay';
import { Link } from 'react-router-dom';
import { GET_GOATS } from '../../constants';

class Browse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goats: [], 
    }
  }

  componentDidMount() {
    axios.get(GET_GOATS)
      .then((response) => {
        this.setState({ goats: response.data.users })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  
  render() {
    console.log(this.props.user)
    const goatDisplays = this.state.goats.map((goat) => {
      if(this.props.user){
        
        return(
          
          <Link to={
            { pathname:`/goat/${goat._id}`,
              state: {goat: goat,
                      user: this.props.user}
            }
            }>
            <GoatDisplay goat={goat} key={goat._id} />
          </Link>)

      } else {
        return (
          <div>
            <h3>Must be logged in to view</h3>
            <GoatDisplay goat={goat} key={goat._id} />
          </div>
        )
      }
  })
    return (
      <div className="browse-display">
        <div className="goats-display">
          {goatDisplays}
        </div>
        <div className="map-container">
          <Map goats={this.state.goats}/>
        </div>
      </div>
    );
  }
}

export default Browse;
