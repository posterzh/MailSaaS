
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Label, Input, Table, Modal, ModalHeader, ModalBody, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { ProspectActionData } from '../../../redux/action/ProspectsAction'
import ProspectOnclick from './ProspectOnclick'
import { OnclickProspectActionData } from '../../../redux/action/ProspectsAction'
class Prospects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dd1: false,
            value: 'Any',
            searchEmail: "",
            showProspect: false
        };
    }
    dropdownToggle = () => {
        this.setState({
            dd1: !this.state.dd1
        });
    }
    toggle = () => {
        this.setState({
            showProspect: !this.state.showProspect
        })
    }
    select = (e) => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            value: e.target.innerText
        });
    }
    componentDidMount() {
        this.props.ProspectActionData(this.props);
    }
    render() {
        const { showProspect } = this.state;
        const { prospectData } = this.props;
        return (
            <div className="prospect-main-container">
                <div className='campaign_navbar' >
                    <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>Prospects</h1>
                    <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></p>
                </div>
                <Modal className="prospect_modal" isOpen={showProspect} toggle={this.toggle}>
                    <ModalHeader className="prospect_modalheader" toggle={this.toggle}></ModalHeader>
                    <ModalBody className="prospect_modalbody" >
                        <ProspectOnclick />
                    </ModalBody>
                </Modal>
                <Container fluid className='mt-4' >
                    <Row>
                        <Col md='2'>
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
                        <Col md='1' className=' prospect_details'><h1>{prospectData && prospectData.map((item, index) => { return })}</h1><span >TOTAl</span></Col>
                        <Col md='1' className=' prospect_details'><h1>6</h1><span >IN CAMPAIGN</span></Col>
                        <Col md='1' className=' prospect_details'><h1>6</h1><span >ENGAGED</span></Col>
                        <Col md='1' className=' prospect_details'><h1>6</h1><span >LEADS</span></Col>
                        <Col md='1' className=' prospect_details'><h1>6</h1><span >BOUNCES</span></Col>
                        <Col md='1' className=' prospect_details'><h1>6</h1><span >UNSUBSCRIBES</span></Col>
                    </Row>
                    <Row className=' mt-3 input_search_div'>
                        <Col md='4'>
                            <div className='grand_parent' >
                                <div className='input_field'>
                                    <Input type='email' className='in' placeholder='SearchEmail' onChange={(event) => { this.setState({ searchEmail: event.target.value }) }} />
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
                                        <span className='font_icon'><i className="fa fa-undo" aria-hidden="true"></i></span>
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
                                    {/* <th>STATUS</th> */}
                                    <th>CAMPAGINS</th>
                                    <th>SENT</th>
                                    {/* <th>TASKS</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    prospectData && prospectData.filter((item) => {
                                        if (item.email.toLowerCase().includes(this.state.searchEmail.toLowerCase())) { return <div>{item.email}</div> } else (this.state.searchEmail == "")
                                        { return null }
                                    }).map((item, index) => {
                                        return <tr onClick={() => this.props.OnclickProspectActionData(item.id)} >
                                            <td key={index}><input type='checkbox'></input></td>
                                            <td onClick={this.toggle} value={index}>{item.email}</td>
                                            <td value={index}>{item.name}</td>
                                            <td value={index}>{item.created}</td>
                                            {/* <td value={index}>{item.status}</td> */}
                                            <td value={index}>{item.campaign_count}</td>
                                            {/* <td value={index}>{item.sent === false ? 0 : 1}</td> */}
                                            <td value={index}>{item.sent}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    // console.log("cheking state", state.ProspectsGetReducer.prospectData)
    // console.log("++++++++++++++++",OnclickProspectsReducer.prospectOnclickData)
    return {
        prospectData: state.ProspectsGetReducer.prospectData,
        // id:state.ProspectsGetReducer.prospectData && state.ProspectsGetReducer.prospectData.id
    }
}

const mapDispatchToProps = dispatch => ({
    ProspectActionData: prospectData => {
        dispatch(ProspectActionData(prospectData))
    },
    OnclickProspectActionData: id => { dispatch(OnclickProspectActionData(id)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(Prospects)
