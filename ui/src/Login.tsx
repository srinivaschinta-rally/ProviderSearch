import React from "react";
import axios from "axios";
import { Redirect } from "react-router";
import { Button, Form, Row, Col } from 'react-bootstrap';


export interface LoginProps {

}

export interface LoginState {
    creds: {
        userName: string;
        password: string;
    };
    authenticated: boolean;
    message: string;
    register: boolean;
}

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props) {
        super(props);
        this.state = { creds: { userName: '', password: '' }, authenticated: false, message: '', register: false };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleNameChange(event) {
        this.setState({ creds: { ...this.state.creds, userName: event.target.value } });
    }
    handlePasswordChange(event) {
        this.setState({ creds: { ...this.state.creds, password: event.target.value } });
    }

    handleSubmit(event) {
        axios.post("/api/signin", this.state.creds)
            .then(token => {
                if (token.status !== 200)
                    this.setState({ message: "No..No.." })
                else {
                    localStorage.setItem('token', token.data);
                    this.setState({ authenticated: true })
                }
                event.preventDefault();
            },
                error => {
                    this.setState({ message: error.response.data });
                }
            )
    }

    handleRegister(event) {
        this.setState({ register: true });
    }

    render() {
        const { userName, password } = this.state.creds;
        if (this.state.authenticated)
            return <Redirect to={{ pathname: '/' }} />
        else if (this.state.register)
            return <Redirect to={{ pathname: '/register' }} />
        else
            return (
                <div>
                    <Row>
                        <Col sm={10} />
                        <Col>
                            <Button type="submit" value="Submit" onClick={this.handleRegister} >Register</Button>
                        </Col>
                    </Row>

                    <div className='center_div'>
                        <h4>LOGIN</h4>
                        <div >
                            <Form.Group>
                                <Form.Control type="text" placeholder="User Id" onChange={this.handleNameChange} value={userName} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Control type="password" placeholder="Password" onChange={this.handlePasswordChange} value={password} />
                            </Form.Group>
                            <Button type="submit" value="Submit" onClick={this.handleSubmit} >Login</Button>
                        </div>

                        <div>{this.state.message} </div>
                    </div>
                </div>
            );
    }
}

export default Login;