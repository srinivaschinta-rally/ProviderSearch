import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Button, FormText, FormLabel, Form } from 'react-bootstrap';


export interface LoginProps {

}

export interface LoginState {
    creds: {
        userName: string;
        password: string;
    };
    registered: boolean;
    message: string;
}

class Register extends React.Component<LoginProps, LoginState> {

    constructor(props) {
        super(props);
        this.state = { creds: { userName: '', password: '' }, registered: false, message: '' };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ creds: { ...this.state.creds, userName: event.target.value } });
    }
    handlePasswordChange(event) {
        this.setState({ creds: { ...this.state.creds, password: event.target.value } });
    }

    handleSubmit(event) {
        axios.post("/api/register", this.state.creds)
            .then(token => {
                if (token.status !== 200)
                    this.setState({ message: "Registration failed" })
                else {
                    this.setState({ registered: true })

                }
                event.preventDefault();
            },
                error => {
                    this.setState({ message: error.response.data });
                }
            )
    }

    render() {
        const { userName, password } = this.state.creds;
        if (this.state.registered)
            return <Redirect to={{ pathname: '/login' }} />
        else
            return (
                <div className='center_div'>
                <h4>REGISTRATION</h4>
                    <div >
                        <Form.Group>
                            <Form.Control type="text" placeholder="User Id" onChange={this.handleNameChange} value={userName} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange} value={password} />
                        </Form.Group>
                        <Button type="submit" value="Submit" onClick={this.handleSubmit} >Register</Button>
                    </div>

                    <div>{this.state.message} </div>
                </div>
            );
    }
}

export default Register;