// src/Dashboard.js

import React, { Component } from 'react';
import axios from 'axios';
import { VoterList } from './VoterList';
import { VoterOffer } from './VoterOffer';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleAcceptedVoter = this.handleAcceptedVoter.bind(this);
    this.state = { voters: [] }
  }

  getAdoptedVoters() {
    axios.get(`${process.env.REACT_APP_API_URL}/voters`,
      {
        params: { user_id: 'auth0|5aac2cd53092f503a3de2509' }
      })
      .then(res => {
        this.setState( {voters: res.data} );
      })
      .catch(err => {
        console.error(err)
      });
  }

  handleAcceptedVoter(voter) {
    this.setState({ voters: this.state.voters.concat([voter])});
  }

  componentWillMount(){
    this.getAdoptedVoters()
  }

  render() {
    return (
      <div className="tc">
        <VoterOffer handleAccept={this.handleAcceptedVoter}/>
        <VoterList voters={this.state.voters}/>
      </div>
    );
  }
}

export default Dashboard