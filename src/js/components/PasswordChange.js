import React, { Component } from 'react';

import { auth } from '../../config';

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChangeForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (e) => {
        const { passwordOne } = this.state;

        auth.doPasswordUpdate(passwordOne)
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
        passwordOne,
        passwordTwo,
        error,
        } = this.state;

        const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '';

        return (
            <div className="login-form">
                <form onSubmit={this.onSubmit}>
                    <h5 className="h5-align">Change Password</h5>
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
                                placeholder="New Password"
                                required="required" />
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
                                placeholder="Confirm New Passowrd"
                                required="required" />
                        </div>
                    </div>
                    <button disabled={isInvalid} type="submit" className="btn btn-success btn-block login-btn">
                        Update My Password
                    </button>                    

                    { error && <p>{error.message}</p> }
                </form>
            </div>
        );
    }
}

export default PasswordChangeForm;