import React from 'react'
import { Container, Row, Col, Table } from 'reactstrap';

export default function Recipients() {
    return (
        <div className='main-view'>
            <Container fluid>
                <Row className='mt-5'>
                    <Col md='1' className='Recipients_details'><a href='#'><h1>1</h1><span >LISTS</span></a></Col>
                    <Col md='1' className='Recipients_details'><a href='#'><h1>1</h1><span >WON</span></a></Col>
                    <Col md='10' className='align-right' >
                        <div className='w-h-25' >
                            <button className='btn sequence_btn btn-md'>EDIT SEQUENCE</button>
                            <div className='child ml-3'>
                                <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                    <span className='font_icon'><i class="fa fa-arrow-down" style={{ borderBottom: '2px solid silver' }}></i></span>
                                </a>
                            </div>

                            <div className='child ml-3'>
                                <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                    <span className='font_icon'><i class="fa fa-undo" aria-hidden="true"></i></span>
                                </a>
                            </div>
                        </div>
                    </Col>
                    <Col>

                        <Table responsive hover className='prospect_table' >
                            <thead >
                                <tr>
                                    <th><input type='checkbox' /></th>
                                    <th >EMAIL</th>
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
        </div >
    )
}
