import React from 'react';
import './App.css';
import House from './components/house';

const HOUSES_ENDPOINT = 'https://ancient-tiaga-31359.herokuapp.com/api/houses';

//cannot get the API to connect. Fails to Fetch; error reads:
//Access to fetch at 'https://ancient-tiaga-31359.herokuapp.com/api/houses' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
//stops whole program

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.addNewRoom = this.addNewRoom.bind(this);
    this.deleteRoom = this.deleteRoom.bind(this);
  }

  render() {
    const houses = this.state 
      ? this.state.houses.map((house, index) =>
        <House
        key={index}
        data={house}
        addNewRoom={this.addNewRoom}
        deleteRoom={this.deleteRoom} />)
      : null;
      return (
        <div> 
          {houses}
        </div>
      );
  }

  componentDidMount() {
    fetch(HOUSES_ENDPOINT)
      .then(res => res.json())
      .then(data => {
        this.setState({
          houses: data
        });
      });
  }

  deleteRoom(e, house, room) {
    const index = house.room.indexOf(room);
    house.rooms.splice(index, 1);
    updateHouse(house)
      .then(() => {
        this.setState(state => {
        for (let h of this.state.houses) {
          if (h._id === house._id) {
            let h = house;
            break;
          }
        }
        return state;
      });
    });
    e.preventDefault();
}

addNewRoom(e, house, room) {
  house.rooms.push(room)
  updateHouse(house)
    .then(() => {
      this.setState(state => {
      for (let h of this.state.houses) {
        if (h._id === house._id) {
          let h = house;
          break;
        }
      }
      return state;
    });
  });
  e.preventDefault();
}
}

function updateHouse(house) {
  return fetch(`${HOUSES_ENDPOINT}/${house._id}`, {
    method : 'PUT' , 
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(house)
  });
}