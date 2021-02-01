import React from 'react'
import { Container, Row, Col, Table } from 'reactstrap';
export default function Sequence() {
    return (
        <div>
            <Container>
                <Row className='mt-5'>
                    <Col md='10' className='mx-auto'>
                        <Row>
                            <div className='sequence_btn_div'>
                                <button className='btn sequence_btn btn-md'>EDIT SEQUENCE</button>
                            </div>
                        </Row>
                        <Row className='mt-4'>
                            <div className='Sequence_div'>
                                <span> <a href=''><i class="fa fa-envelope"></i> &nbsp;Initial campaign email</a></span><br></br>
                                <span style={{ lineHeight: '1.4' }}>Hello all</span>
                                <p>dhjhfjdhjdfs</p>
                            </div>
                        </Row>
                        <Row>
                            <div className='sequence_draw_div'>
                                <div className='line_div'></div>
                            </div>
                            <div className='sequence_draw_div'>
                                <div className='sequence_circle'></div>
                            </div>
                            <div className='sequence_draw_div'>
                                <div className='line_div'></div>
                            </div>
                        </Row>
                        <Row>
                            <div className='Sequence_div'>
                                <span> <a href=''><i class="fa fa-reply"></i> &nbsp;follow up</a></span><br></br>
                                <span style={{ lineHeight: '1.4' }}>Hello all</span>
                                <p>dhjhfjdhjdfs</p>
                            </div>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
