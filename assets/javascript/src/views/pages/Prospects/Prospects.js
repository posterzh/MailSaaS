import React, { Component } from 'react'
import { Container, Row, Col, Label, Input, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

class Prospects extends Component {
    constructor() {
        super();

        this.state = {
            dd1: false,
            value: 'Any'
        };
    }

    dropdownToggle = () => {
        this.setState({
            dd1: !this.state.dd1
        });
    }
    select = (e) => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            value: e.target.innerText
        });
    }

    render() {

        return (
            <div>
                <Container fluid className='mt-4' >
                    <Row>
                        <Col md='4'>
                            <div>
                                <label className='filter_app'>Teammate</label><br></br>
                                <select className='filter_select_prospect'>
                                    <option value='one'>One</option>
                                    <option value='two'>two</option>
                                    <option value='three'>three</option>
                                    <option value='four'>Four</option>
                                </select>
                            </div>
                        </Col>

                    </Row>
                    <Row className='mt-4'>
                        <Col md='1'>
                            <Row><Col><h1>33</h1></Col></Row>
                            <Row><Col><span style={{ fontSize: '0.7em' }}>TOTAl</span></Col></Row>
                        </Col>
                        <Col md='1'>
                            <Row><Col><h1>6</h1></Col></Row>
                            <Row><Col><span style={{ fontSize: '0.7em' }}>IN CAMPAIGN</span></Col></Row>
                        </Col>
                        <Col md='1'>
                            <Row><Col><h1>6</h1></Col></Row>
                            <Row><Col><span style={{ fontSize: '0.7em' }}>ENGAGED</span></Col></Row>
                        </Col>
                        <Col md='1'>
                            <Row><Col><h1>6</h1></Col></Row>
                            <Row><Col><span style={{ fontSize: '0.7em' }}>LEADS</span></Col></Row>
                        </Col>
                        <Col md='1'>
                            <Row><Col><h1>6</h1></Col></Row>
                            <Row><Col><span style={{ fontSize: '0.7em' }}>BOUNCES</span></Col></Row>
                        </Col>
                        <Col md='1'>
                            <Row><Col><h1>6</h1></Col></Row>
                            <Row><Col><span style={{ fontSize: '0.7em' }}>UNSUBSCRIBES</span></Col></Row>
                        </Col>
                    </Row>
                    <Row className='mt-5'>
                        <Col md='4'>
                            <div className='grand_parent' >
                                <div className='input_field'>
                                    <Input type='email' className='in' placeholder='Search' />
                                    <div className='child'>
                                        <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                            <span className='font_icon'><i class="fa fa-search" aria-hidden="true"></i></span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                        </Col>
                        <Col md='4' className=''>
                            <div className='grand_parent mt-4'>
                                <div>
                                    <select className='filter_select_prospect'>
                                        <option value='one'>One</option>
                                        <option value='two'>two</option>
                                        <option value='three'>three</option>
                                        <option value='four'>Four</option>
                                    </select>
                                </div>
                            </div>
                        </Col>
                        <Col md='4' className=''>
                            <div className='grand_parent mt-4'>
                                <div>
                                    <select className='filter_select_prospect'>
                                        <option value='one'>One</option>
                                        <option value='two'>two</option>
                                        <option value='three'>three</option>
                                        <option value='four'>Four</option>
                                    </select>
                                </div>
                                <div className='child mt-1 ml-3'>
                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                        <span className='font_icon'><i class="fa fa-undo" aria-hidden="true"></i></span>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='mt-4'>
                        <Col md='12'>
                            <Table responsive hover className='prospect_table' >
                                <thead>
                                    <tr>
                                        <th><input type='checkbox' /></th>
                                        <th>EMAIL</th>
                                        <th>NAME</th>
                                        <th>CREATED</th>
                                        <th>STATUS</th>
                                        <th>CAMPAGINS</th>
                                        <th>SENT</th>
                                        <th>ENGAGED</th>
                                        <th>TASKS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type='checkbox' /></td>
                                        <td>EMAIL</td>
                                        <td>NAME</td>
                                        <td>CREATED</td>
                                        <td>STATUS</td>
                                        <td>CAMPAGINS</td>
                                        <td>SENT</td>
                                        <td>ENGAGED</td>
                                        <td>TASKS</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>

            </div>
        )
    }
}

export default Prospects
