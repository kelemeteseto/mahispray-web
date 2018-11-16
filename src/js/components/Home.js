import React, { Component } from 'react';

import withAuthorization from './withAuthorization';
import { db } from '../../config';

import Dashboard from '../pages/Dashboard';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    componentDidMount() {
        db.doGetUser().then(snapshot =>
            this.setState({ users: snapshot.val() })            
        );
    }

    render() {
        const { users } = this.state;
        
        return (
            <div>

                <Dashboard />

                { !!users && <UserList users={users} /> }                
            </div>            
        );
    }    
}

const UserList = ({ users }) =>
    <div>
        <h2>List of Usernames of Users</h2>
        <p>(Saved on Sign Up in Firebase Database)</p>

        {Object.keys(users).map(key =>
            <div key={key}>{users[key].username}</div>            
        )}
    </div>

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(Home);