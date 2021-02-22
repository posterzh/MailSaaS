
import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Label, Input, Table, Modal, ModalHeader, ModalBody, Card, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { ProspectActionData } from '../../../redux/action/ProspectsAction'
import ProspectOnclick from './ProspectOnclick'
import { OnclickProspectActionData, deleteProspectAction } from '../../../redux/action/ProspectsAction'
const SpanStyles = {
    paddingRight: "10px",
    paddingLeft: "10px",
    color: "white",
    fontSize: "25px",
    cursor: 'pointer'
};
const Span = {
    paddingRight: "20px",
    paddingLeft: "20px",
    color: "white",
    fontSize: "25px",
    borderRight: "1px dashed",
    marginRight: "10px"
};
class Prospects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dd1: false,
            value: 'Any',
            searchEmail: "",
            showProspect: false,
            isSelectionBar: false,
            selectedId: [],
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
    showSelectionBar = (id, e) => {
        console.log(e.target.name, "h")
        const { selectedId } = this.state
        this.setState({
            isSelectionBar: true,
            currentChecked: e.target.name
        })
        if (selectedId.length === 0) {
            selectedId.push(id)
            return
        }
        for (let index = 0; index < selectedId.length; index++) {
            if (id === selectedId[index]) {
                let array = selectedId.filter(e => e != id)
                this.setState({
                    selectedId: array
                }, () => { console.log(array, "select") })
                return
            }
        }
        selectedId.push(id)
        console.log(selectedId, "sdfsdg")
    }
    ProspectDelete = () => {
        this.setState({
            isSelectionBar: false,
            checked: false
        })
        let id = this.state.selectedId;
        this.props.deleteProspectData(id)
        this.state.selectedId.length = 0;
        console.log("000000000000000000000000???????", this.props.deleteProspectData())
    }

    componentDidMount() {
        this.props.ProspectActionData(this.props);
    }
    render() {
        const { showProspect, isSelectionBar, selectedId, currentChecked, checked } = this.state;
        const { prospectData } = this.props;
        return (
            <div className="prospect-main-container">
                <div className='campaign_navbar' >
                    <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>Prospects</h1>
                    <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></p>
                </div>
                <div style={{ padding: '20px' }} className={`selection-bar ${isSelectionBar && selectedId.length > 0 ? "_block" : " "}`} >
                    <span style={SpanStyles} onClick={() => { this.setState({ isSelectionBar: false }); selectedId.length = 0 }}><i className="fa fa-close" aria-hidden="true"></i></span>
                    <span style={Span} >{selectedId.length} selected</span>
                    <div onClick={this.ProspectDelete}>
                        <span style={SpanStyles}><i className="fas fa-minus-circle"></i></span>
                        <span style={SpanStyles} >Delete</span>
                    </div>
                </div>
                <Modal className="prospect_modal" isOpen={showProspect} toggle={this.toggle}>
                    <ModalHeader className="prospect_modalheader" toggle={this.toggle}></ModalHeader>
                    <ModalBody className="prospect_modalbody" >
                        <ProspectOnclick />
                    </ModalBody>
                </Modal>
                <Container fluid className='mt-4' >
                    <Row>
                        <Col md={2}>
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
                        <Col md={1} className=' prospect_details'><h1>{prospectData && prospectData.map((item, index) => { return })}</h1><span >TOTAl</span></Col>
                        <Col md={1} className=' prospect_details'><h1>6</h1><span >IN CAMPAIGN</span></Col>
                        <Col md={1} className=' prospect_details'><h1>6</h1><span >ENGAGED</span></Col>
                        <Col md={1} className=' prospect_details'><h1>6</h1><span >LEADS</span></Col>
                        <Col md={1} className=' prospect_details'><h1>6</h1><span >BOUNCES</span></Col>
                        <Col md={1} className=' prospect_details'><h1>6</h1><span >UNSUBSCRIBES</span></Col>
                    </Row>
                    <Row className=' mt-3 input_search_div'>
                        <Col md={4}>
                            <div className='grand_parent' >
                                <div className='input_field'>
                                    <Input type='email' className='in' placeholder='SearchEmail' onChange={(event) => { this.setState({ searchEmail: event.target.value }) }} />
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
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
                        <Col md={4}>
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
                                    }).map((e, index) => {
                                        return <tr onClick={() => this.props.OnclickProspectActionData(e.id)} >
                                            <td
                                                name={index}
                                                key={index}
                                                onChange={(event) => { this.showSelectionBar(e.id, event) }}
                                                style={{ width: '20px', height: '20px' }}><input type='checkbox'>
                                                </input>
                                            </td>
                                            <td onClick={this.toggle} value={index}>{e.email}</td>
                                            <td value={index}>{e.name}</td>
                                            <td value={index}>{e.created}</td>
                                            {/* <td value={index}>{e.status}</td> */}
                                            <td value={index}>{e.campaign_count}</td>
                                            {/* <td value={index}>{e.sent === false ? 0 : 1}</td> */}
                                            <td value={index}>{e.sent}</td>
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
    console.log("++++++++++++++++", state.ProspectsGetReducer.prospectData && state.ProspectsGetReducer.prospectData.map((e, i) => { return e.id }))
    return {
        prospectData: state.ProspectsGetReducer.prospectData,
        id: state.ProspectsGetReducer.prospectData
    }
}
const mapDispatchToProps = dispatch => ({
    ProspectActionData: prospectData => {
        dispatch(ProspectActionData(prospectData))
    },
    OnclickProspectActionData: id => { dispatch(OnclickProspectActionData(id)) },
    deleteProspectData: id => { dispatch(deleteProspectAction(id)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(Prospects)
