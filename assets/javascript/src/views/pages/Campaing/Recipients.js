import React from 'react'
import { Container, Row, Col, Table, Input,Modal } from 'reactstrap';
export default function Recipients() {
    return (
        <div className='main-view'>
            <Container fluid>
                <Row className='mt-5'>
                    <Col md='1' className='Recipients_details'><a href='#'><h1>1</h1><span >LISTS</span></a></Col>
                    <Col md='1' className='Recipients_details'><a href='#'><h1>1</h1><span >WON</span></a></Col>
                    <Col md='10' className='align-right' >
                        <div className='w-h-25' >
                            <button className='btn sequence_btn btn-md'>ADD RECIPIENTS</button>
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
                </Row>
                <Row className=' mt-3 input_search_div'>
                    <Col md='4'>
                        <div className='grand_parent' >
                            <div className='input_field'>
                                <Input type='email' className='in' placeholder='Search' />
                                <div className='child mt-2'>
                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                        <span className='font_icon'><i class="fa fa-search" aria-hidden="true"></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md='4'>
                        <div className='grand_parent mt-4'>
                            <div className='select_div'>
                                <select className='filter_select_prospect'>
                                    <option value='one'>One</option>
                                    <option value='two'>two</option>
                                    <option value='three'>three</option>
                                    <option value='four'>Four</option>
                                </select>
                            </div>
                        </div>
                    </Col>
                    <Col md='4'>
                        <div className='grand_parent mt-4'>
                            <div className='select_div'>
                                <select className='filter_select_prospect'>
                                    <option value='one'>One</option>
                                    <option value='two'>two</option>
                                    <option value='three'>three</option>
                                    <option value='four'>Four</option>
                                </select>
                            </div>
                            <div className='child ml-3'>
                                <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                    <span className='font_icon'><i class="fa fa-undo" aria-hidden="true"></i></span>
                                </a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
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
                </Row>
            </Container>
            <div>
                {/* <Modal toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Choose an export </ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row>
                                <Col>
                                    <div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal> */}
            </div>
        </div >
    )
}
