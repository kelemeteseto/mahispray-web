import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../config';
import * as routes from '../constants/routes';

const PasswordForgetPage = () =>
    <div>        
        <PasswordForgetForm />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (e) => {
        const { email } = this.state;

        auth.doPasswordReset(email)
        .then(() => {
            this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
            this.setState(byPropKey('error', error));
        });

        e.preventDefault();
    }

    render() {
        const {
        email,
        error,
        } = this.state;

        const isInvalid = email === '';

        return (
            <div className="login-form">
                <form onSubmit={this.onSubmit}>
                    <h5 className="h5-align">Forgot Password?</h5>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-envelope"></i></span>                         
                            <input 
                                type="email"
                                name="email" 
                                value={this.state.email}
                                onChange={event => this.setState(byPropKey('email', event.target.value))} 
                                className="form-control" 
                                id="inputEmail1"
                                placeholder="Email"
                                required="required" />
                        </div>
                    </div>
                    <button disabled={isInvalid} type="submit" className="btn btn-success btn-block login-btn">
                        Reset My Password
                    </button>      

                    { error && <p>{error.message}</p> }
                </form>
            </div>
        );
    }
}

const PasswordForgetLink = () =>
    <div className="pull-right text-success">
        <Link className="fgt-pwd-size" to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
    </div>

export default PasswordForgetPage;

export {
    PasswordForgetForm,
    PasswordForgetLink,
};