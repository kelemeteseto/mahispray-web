import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { RegisterLink } from './Register';
import { PasswordForgetLink } from './PasswordForget';
import { auth, db } from '../../config';
import * as routes from '../constants/routes';

const LoginPage = ({ history }) =>
    <div>
        <h2 className="text-center">Sign in</h2>
        <LoginForm history={history} />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class LoginForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (e) => {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                db.doGetUser(authUser.user.uid, email)
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
            email,
            password,
            error,
        } = this.state;

        const isInvalid = 
            password === '' ||
            email === '';

        return (
            <div className="login-form">
                <form onSubmit={this.onSubmit}>
                    <div className="text-center social-btn">
                        <a href="/" className="btn btn-primary btn-block"><i className="fa fa-facebook"></i> Sign in with <b>Facebook</b></a>
                        <a href="/" className="btn btn-info btn-block"><i className="fa fa-twitter"></i> Sign in with <b>Twitter</b></a>
                        <a href="/" className="btn btn-danger btn-block"><i className="fa fa-google"></i> Sign in with <b>Google</b></a>
                    </div>
                    <div className="or-seperator"><i>or</i></div>
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
                                required="required" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-key"></i></span>
                            <input 
                                type="password" 
                                name="password"
                                value={password} 
                                onChange={event => this.setState(byPropKey('password', event.target.value))} 
                                className="form-control" 
                                id="inputPassword1"
                                placeholder="Password"
                                required="required" />
                        </div>
                    </div>        
                    <div className="form-group">
                        <button disabled={isInvalid} type="submit" className="btn btn-success btn-block login-btn">Sign in</button>
                    </div>
                    <div className="clearfix">
                        <label className="pull-left checkbox-inline"><input type="checkbox" /> Remember me</label>
                        <PasswordForgetLink  />
                    </div>  
                    
                    { error && <p>{error.message}</p> }
                </form>                
                <RegisterLink />
            </div>
        )
    }
}

const LoginLink = () =>
    <div className="hint-text small">
        Already have an account?
        {' '}
        <Link to={routes.LOGIN} className="text-success">Login Now!</Link>
    </div>

export default withRouter(LoginPage);

export {
    LoginForm,
    LoginLink,
};