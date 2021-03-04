import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Table,
    Modal,
    ModalHeader,
    ModalBody,
    Card,
    CardBody,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Form,
    FormGroup,
    CardTitle
} from 'reactstrap'
import { ProspectActionData, ProspectUnsubscribeAction } from '../../../redux/action/ProspectsAction'
import ProspectOnclick from './ProspectOnclick'
import { OnclickProspectActionData, deleteProspectAction } from '../../../redux/action/ProspectsAction'
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import Tables from "./TableContent";


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
            id: '',
            selected: 'total'
        };
    }
    dropdownToggle = () => {
        this.setState({
            dd1: !this.state.dd1
        });
    }
    toggle = (id) => {
        this.setState({
            showProspect: !this.state.showProspect,
            id: id
        })
    }
    showSelectionBar = (id) => {
        const { selectedId } = this.state
        this.setState({
            isSelectionBar: true,
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
                })
                return
            }
        }
        selectedId.push(id)
    }
    ProspectDelete = (data) => {
        let id = this.state.selectedId;
        this.props.deleteProspectData(id)
        // this.state.selectedId.length = 0;
        this.setState({
            isSelectionBar: false,
            checked: false
        })
        alert("deleted")
    }
    unsubscribeProspect = () => {
        this.props.unsubscribeProspectAction(this.state.selectedId)
        this.setState({
            isSelectionBar: false,
            selectedId: []
        })
        alert("unsubscribed")
    }
    componentDidMount() {
        this.props.ProspectActionData(this.props);
    }
    paginationCallback(value) {
        console.log("value : ", value)
    }
    render() {
        const { showProspect, isSelectionBar, selectedId } = this.state;
        const { prospectData, propData } = this.props;
        const tableTitle = [
            {
                key: 'email',
                value: 'Email',
            },
            {
                key: 'name',
                value: 'Name',
            },
            {
                key: 'created',
                value: 'Created',
            },
            {
                key: 'status',
                value: 'Status',
            },
            {
                key: 'campaign',
                value: 'Campaign',
            },
            {
                key: 'sent',
                value: 'Sent',
            },
            {
                key: 'engaged',
                value: 'Engaged',
            },
            {
                key: 'tasks',
                value: 'Tasks',
            },
        ];
        const tableData = [
            {
                email: 'ajju@gmail.com',
                name: 'Azazul',
                created: '10-10-2020',
                status: 'Passed',
                campaign: '1458',
                sent: '10',
                engaged: '9',
                tasks: '8'
            },
            {
                email: 'ajju@gmail.com',
                name: 'Azazul',
                created: '10-10-2020',
                status: 'Passed',
                campaign: '1458',
                sent: '10',
                engaged: '2',
                tasks: '8'
            }
        ]
        return (
            <div className="prospect-main-container">
                <PageHeader
                    current="Prospects"
                    parent="Prospects"
                    showStatus={false}
                />
                <PageContainer title={false} showHelper={false}>
                    <Row>
                        <Col sm="12" md="3">
                            <Form>
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="exampleFormControlSelect1"
                                    >
                                        Teammate
                                    </label>
                                    <Input id="exampleFormControlSelect1" type="select" defaultValue="any">
                                        <option value="any">Any</option>
                                    </Input>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={()=>{this.setState({selected: 'total'})}}>
                            <Card className={this.state.selected === 'total' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>120</div>
                                            <div>Total</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={()=>{this.setState({selected: 'in-campaign'})}}>
                            <Card className={this.state.selected === 'in-campaign' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>94</div>
                                            <div>In Campaign</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={()=>{this.setState({selected: 'engaged'})}}>
                            <Card className={this.state.selected === 'engaged' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>9</div>
                                            <div>Engaged</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={()=>{this.setState({selected: 'leads'})}}>
                            <Card className={this.state.selected === 'leads' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>13</div>
                                            <div>Leads</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={()=>{this.setState({selected: 'bounces'})}}>
                            <Card className={this.state.selected === 'bounces' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>2</div>
                                            <div>Bounces</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2" sm="4" className="sidenav-toggler" onClick={()=>{this.setState({selected: 'unsubscribes'})}}>
                            <Card className={this.state.selected === 'unsubscribes' ? "bg-info" : "bg-light"}>
                                <CardBody className="text-center p-3">
                                    <CardTitle className="m-0">
                                        <h3 className="text-white heading m-0">
                                            <div>18</div>
                                            <div>Unsubscribes</div>
                                        </h3>
                                    </CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Tables titles={tableTitle} showAction={true} showSelect={true} tablePropsData={tableData} paginationCallback={this.paginationCallback}/>
                    </Row>
                </PageContainer>
                <div className='campaign_navbar' >
                    <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>Prospects</h1>
                    <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></p>
                </div>
                <div style={{ padding: '20px' }} className={`selection-bar ${isSelectionBar && selectedId.length > 0 ? "_block" : " "}`} >
                    <span style={SpanStyles} onClick={() => { this.setState({ isSelectionBar: false }); selectedId.length = 0 }}><i className="fa fa-close" aria-hidden="true"></i></span>
                    <span style={Span} >{selectedId.length} selected</span>
                    <div >
                        <span style={SpanStyles}><i className="fas fa-minus-circle"></i></span>
                        <span onClick={this.ProspectDelete} style={SpanStyles} >delete</span>:
                        <span onClick={this.unsubscribeProspect} style={SpanStyles} >Unsubscribe</span>
                    </div>
                    <div>

                    </div>
                </div>


                <Modal className="prospect_modal" isOpen={showProspect} toggle={this.toggle}>
                    <ModalHeader className="prospect_modalheader" toggle={this.toggle}>{propData && propData.reciepent_email}</ModalHeader>
                    <ModalBody className="prospect_modalbody" >
                        <ProspectOnclick id={this.state.id} />
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
                        <Col md={2} className=' prospect_details'><h1>{prospectData && prospectData.map((item, index) => { return item.total_count})}</h1><span >TOTAl</span></Col>
                        <Col md={2} className=' prospect_details'><h1>{prospectData && prospectData.map((item, index)=>{ return item.in_campaign_count})}</h1><span >IN CAMPAIGN</span></Col>
                        <Col md={2} className=' prospect_details'><h1>{prospectData && prospectData.map((item, index)=>{ return item.leads_count})}</h1><span >LEADS</span></Col>
                        <Col md={2} className=' prospect_details'><h1>{prospectData && prospectData.map((item, index)=>{ return item.unsubscribe})}</h1><span >UNSUBSCRIBES</span></Col>
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
                                        if (item.email && item.email.toLowerCase().includes(this.state.searchEmail.toLowerCase())) { return <div>{item.email}</div> } else (this.state.searchEmail == "")
                                        { return null }
                                    }).map((item, index) => {
                                        return <tr >
                                            <td key={index}><input onChange={() => this.showSelectionBar(item.id)} type='checkbox'></input></td>
                                            <td onClick={() => this.toggle(item.id)} value={index}>{item.email}</td>
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
    console.log("propData: state.OnclickProspectsReducer.prospectOnclickData &&state.OnclickProspectsReducer.prospectOnclickData", state.OnclickProspectsReducer.prospectOnclickData && state.OnclickProspectsReducer.prospectOnclickData)
    return {
        prospectData: state.ProspectsGetReducer.prospectData,
        id: state.ProspectsGetReducer.prospectData,
        propData: state.OnclickProspectsReducer.prospectOnclickData && state.OnclickProspectsReducer.prospectOnclickData
    }
}
const mapDispatchToProps = dispatch => ({
    ProspectActionData: prospectData => {
        dispatch(ProspectActionData(prospectData))
    },
    unsubscribeProspectAction: id => {
        dispatch(ProspectUnsubscribeAction(id))
    },
    OnclickProspectActionData: id => { dispatch(OnclickProspectActionData(id)) },
    deleteProspectData: id => { dispatch(deleteProspectAction(id)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(Prospects)
