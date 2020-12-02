import React from 'react';
import { Provider } from './ProviderSearch';
import axios from "axios";
import { Button, Form, Row, Col } from 'react-bootstrap';


interface SearchBoxProps {
    search: (providers: Provider[]) => void;
}

export interface SearchBoxState {
    text: string;
    message: string;
}

class SearchBox extends React.Component<SearchBoxProps, SearchBoxState> {
    constructor(props) {
        super(props);
        this.state = { text: '', message: '' };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    getResults = (text) => {
        axios.get("/api/search",{ params: { text: text } })
            .then(providers => {
                if (providers.status !== 200)
                    this.setState({ message: "No..No.." })
                else {
                    this.props.search(providers.data);
                }
                
            },
                error => {
                    this.setState({ message: error.response.data });
                }
            );
    }

    handleSearch(event) {
        this.getResults(this.state.text);
        event.preventDefault();
    }
    handleTextChange(event) {
        this.setState({ text: event.target.value });
        this.getResults(event.target.value);
    }
    render() {
        return (<div style={{backgroundColor:'#E7E5E5',padding:'30px',marginTop:'30px'}}>
            <Row>
                <Form.Control type="text" style={{width:'100%'}}  placeholder="Search here" onChange={this.handleTextChange} value={this.state.text} />
            </Row>
        </div>);
    }
}

export default SearchBox;

