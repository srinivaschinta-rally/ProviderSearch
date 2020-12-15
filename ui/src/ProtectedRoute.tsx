import React from 'react'
import { Redirect } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import Logout from "./LogOut";

interface Props {
    component: any;
    exact: Boolean;
    path: String;
}

class ProtectedRoute extends React.Component<Props> {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('token');

        return (
            <div>

                {isAuthenticated ? (
                    <div>
                        <div style={{ borderBottom: '1px lightgray solid', marginBottom: '20px' }}>
                            <Row>
                                <Col sm={9}>
                                    <div style={{ padding: '10px 10px 10px 60px', color: "#205490", fontWeight: 'bold' }}>
                                        <h4> Rally Health India </h4>
                                    </div>
                                </Col>
                                <Col>
                                    <div style={{ padding: '10px 10px 10px 60px', color: "#205490", fontWeight: 'bold' }}>
                                        <Logout />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Component />
                    </div>
                ) : (
                        <Redirect to={{ pathname: '/login' }} />
                    )}
            </div>)
    }
}

export default ProtectedRoute;