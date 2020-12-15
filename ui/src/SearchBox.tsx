import React, { useState } from 'react';
import { Provider } from './ProviderSearch';
import axios from "axios";
import { Form, Row } from 'react-bootstrap';


interface SearchBoxProps {
    search: (providers: Provider[]) => void;
}

export interface SearchBoxState {
    text: string;
    message: string;
}

export const SearchBox = (props: SearchBoxProps) => {

    const [text, setText] = useState('');
    const [message, setMessage] = useState('');

    const getResults = (text) => {
        axios.get("/api/search", { params: { text: text } })
            .then(providers => {
                if (providers.status !== 200)
                    setMessage("No..No..")
                else {
                    props.search(providers.data);
                }

            },
                error => {
                    setMessage(error.response.data);
                }
            );
    }

    const handleTextChange = (event) => {
        setText(event.target.value);
        getResults(event.target.value);
    }

    return (<div style={{ backgroundColor: '#E7E5E5', padding: '30px', marginTop: '30px' }}>
        <Row>
            <Form.Control type="text" style={{ width: '100%' }} placeholder="Search here" onChange={handleTextChange} value={text} />
            <Form.Control.Feedback type="invalid">
            {message}
          </Form.Control.Feedback>
        </Row>
    </div>);

};

export default SearchBox;