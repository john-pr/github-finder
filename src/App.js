import React, { Component } from 'react';
import Navbar from './components/layout/Navbar.js'
import Users from './components/users/Users.js';
import Search from './components/users/Search.js';
import Alert from './components/layout/Alert.js';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
  };

  // componentDidMount() {
  //   axios
  //     .get('https://api.github.com/users')
  //     .then(res => console.log(res.data));
  // }

  // async componentDidMount() {
  //   this.setState({ loading:true });
  //
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //
  //   this.setState({ users: res.data, loading: false });
  //   // console.log(res.data);
  // }

  //Search Github users
  searchUsers = async text => {
    this.setState({loading: true});

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false });
  };

  //Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false});

  //Set Alert
  setAlert = (msg, type) => {
    this.setState({ alert: {msg, type} });

    setTimeout(() => this.setState({ alert: null}), 5000);
  };

  render() {
    const { users, loading } = this.state;

    return (
        <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert alert={this.state.alert} />
            <Search
              searchUsers={this.searchUsers}
              clearUsers={this.clearUsers}
              showClear={users.length > 0 ? true : false}
              setAlert={this.setAlert}
            />
            <Users loading={loading} users={users}/>
            </div>
        </div>
    );
  }
}

export default App;
