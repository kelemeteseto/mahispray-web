import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../../config';
import * as routes from '../constants/routes';

const PasswordForgetPage = () =>
    <div>
        <h1>Forgot Password?</h1>
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
            <form onSubmit={this.onSubmit}>
                <input
                    value={this.state.email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    type="text"
                    placeholder="Email Address"
                />
                <button disabled={isInvalid} type="submit">
                    Reset My Password
                </button>

                { error && <p>{error.message}</p> }
            </form>
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