import React, { Component } from 'react';
import { Link, withRouter, } from 'react-router-dom';

import { LoginLink } from './Login';
import { auth, db } from '../../config/';
import * as routes from '../constants/routes';

const RegisterPage = ({ history }) =>
    <div>
        <h2 className="text-center">Sign up</h2>
        <RegisterForm history={history} />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    fullname: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (e) => {
        const {
            fullname,
            email,
            passwordOne,
        } = this.state;
        
        const {
            history,
        } = this.props;

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                db.doCreateUser(authUser.user.uid, fullname, email)
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });
                        history.push(routes.HOME);        
                    })
                    .catch(error => {
                        this.setState(byPropKey('error', error));
                    });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });
        e.preventDefault();
    }

    render() {
        const {
            fullname,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid = 
            passwordOne !== passwordTwo || 
            passwordOne === '' ||
            email === '' ||
            fullname === '';

        return (
            <div className="login-form">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user-circle"></i></span>
                            <input
                                type="text"
                                name="fullname" 
                                value={fullname} 
                                onChange={event => this.setState(byPropKey('fullname', event.target.value))}
                                className="form-control" 
                                id="inputFullname1"
                                placeholder="Full Name"
                                required="required"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                            <input
                                type="email"
                                name="email" 
                                value={email} 
                                onChange={event => this.setState(byPropKey('email', event.target.value))} 
                                className="form-control" 
                                id="inputEmail1"
                                placeholder="Email"
                                required="required"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-key"></i></span>
                            <input
                                type="password" 
                                name="password"
                                value={passwordOne}
                                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                                className="form-control" 
                                id="inputPassword1"
                                placeholder="Password"
                                required="required"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-key"></i></span>
                            <input
                                type="password" 
                                name="password"
                                value={passwordTwo}
                                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                                className="form-control" 
                                id="inputPassword2"
                                placeholder="Confirm Password"
                                required="required"
                            />
                        </div>
                    </div>                    
                    <button disabled={isInvalid} type="submit" className="btn btn-success btn-block login-btn">Register</button>

                    { error && <p>{error.message}</p> }
                </form>
                <LoginLink />
            </div>            
        );
    }
}

const RegisterLink = () =>
    <div className="hint-text small">
        Don't have an account?
        {' '}
        <Link to={routes.REGISTER} className="text-success">Register Now!</Link>
    </div>

export default withRouter(RegisterPage);

export {
    RegisterForm,
    RegisterLink,
};