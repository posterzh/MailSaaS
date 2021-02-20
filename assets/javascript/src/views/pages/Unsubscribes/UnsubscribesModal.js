import React, { Component } from 'react'
import { Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form } from 'reactstrap';

export default class UnsubscribesModal extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
                    <Form onSubmit={this.props.handleSubmit}>
                        <ModalHeader toggle={this.props.toggle}><h1>Unsubscribe email addresses </h1><p>TIP: Block a whole domain like this: *@example.com</p></ModalHeader>
                        <ModalBody >
                            <Container>
                                <Row>
                                    <Col md='5'>
                                        <textarea placeholder='Email addresses'></textarea>
                                    </Col>
                                    <Col md='2'>or</Col>
                                    <Col md='5'>Upload a CSV (comma-separated-values) file up to 1MB. It should contain just one column or have a column with the word "email" in it.</Col>
                                </Row>
                                <Row>
                                    <Col md='5'>
                                        <button className='btn'>SUBMIT</button>
                                    </Col>
                                    <Col><button className='btn'>UPLOAD</button></Col>
                                </Row>
                            </Container>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={(e) => { e.preventDefault, this.setState({ modal: !this.props.isOpen }) }}>CANCEL</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
}
