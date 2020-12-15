import React, { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import PersonImage from "./PersonImage";
import { Container, Row, Col } from 'react-bootstrap';
import SearchBox from "./SearchBox";

export interface Provider {
  name: string;
  specialty: string;
  locations: Location[]
}

interface Location {
  anp: string;
  address: Address;
}
interface Address {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  state: string;
  zip: string;
  phone: string
}


function ProviderSearch() {
  const [error, setError] = useState({ message: '' });
  const [isLoaded, setIsLoaded] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [providers, setProviders] = useState<Provider[]>([]);

  useEffect(() => {
    axios.get('/api/providers').then(
      result => {
        if (result.status === 401)
          setUnauthorized(true)
        else if (result.status !== 200)
          setError(result.data);
        else {
          setIsLoaded(true);
          setProviders(result.data);
        }
      },
      error => {
        setIsLoaded(true);
        if (error.response && error.response.status === 401)
          setUnauthorized(true);
        setError(error);
      }
    )

  }, []);

  if (unauthorized)
    return <Redirect to={{ pathname: '/login' }} />
  if (error.message !== '') {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <div className='search-heading'><h2>Who are you looking for? </h2></div>

        <SearchBox search={setProviders}></SearchBox>

        {
          providers.map(p => {
            const location = p.locations[0];
            const { address } = location;
            return <div className='provider' key={p.name}>
              <Row>
                <Col md={8} sm={8}>
                  <Row>
                    <Col sm={4} md={4} lg={2}>
                      <PersonImage></PersonImage>
                    </Col>
                    <Col sm>
                      <div className='provider-details'>
                        <div>
                          <h4 className='provider-heading'>{p.name}</h4>
                        </div>
                        <div>
                          <h6>{p.specialty}</h6>
                        </div>
                        <div>
                          {address.line1}, {address.city} {address.zip}
                        </div>
                        <div>
                          {address.phone} PHONE
                      </div>
                        {
                          ((p.locations.length - 1) > 0) &&
                          <div>
                            <a href='/' > View additional locations({p.locations.length - 1})</a>
                          </div>

                        }
                      </div>
                    </Col>
                  </Row>

                </Col>
                <Col md sm>
                  <div className='provider-details'>
                    {
                      (location.anp === 'A') && <a href='/'>Accepting all patients</a>
                    }
                    {
                      (location.anp === 'E') && <a href='/'>Accepting existing patients</a>
                    }
                    {
                      (location.anp === 'N') && <a href='/'>Not accepting patients</a>
                    }
                  </div>
                  <br/>
                  <div className='provider-details'>
                  <a href='/'>Not evaluated for premium care</a>
                  </div>
                </Col>
              </Row>
            <div style={{fontSize:'13px',padding:'23px',marginTop:'10px', marginBottom:'40px', backgroundColor:'#E7E5E5',borderBottom:'1px gray solid',color:'green'}}>
                    Office visit - Primary doctor - Established Patient - Moderate Complexity
            </div>

            </div>;
          })
        }
      </Container>
    );
  }
}

export default ProviderSearch;