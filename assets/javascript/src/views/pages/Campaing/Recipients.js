import { Container, Row, Col, Table, Input, Modal } from 'reactstrap';
import Campaign_details from "../../../views/pages/Campaing/Campaign_details"
import React, { Component } from 'react'
import { CampaignPeopleAction } from '../../../redux/action/CampaignAction'
import { connect } from 'react-redux';
import { unsubscribeRecipientAction } from '../../../redux/action/UnsubscribeActions';
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
class Recipients extends Component {
    constructor() {
        super();
        this.state={
            isSelectionBar:true,
            selectedId:[]
        }
    }
    componentDidMount() {
        let id = this.props.history.location.state&&this.props.history.location.state.id
        this.props.CampaignPeopleAction(id)
    }
    showSelectionBar = (id) => {
        console.log(id,"dfsfsdfsdfsd")
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
            }, () => { console.log(array, "select") })
            return
          }
        }
        selectedId.push(id)
    }
    unsubscribeRecipient = () => {
        let data = this.state.selectedId
        this.props.unsubscribeRecipientAction(data)
        this.state.selectedId = 0;
    }
    render() {
        const { getData } = this.props;
        const { isSelectionBar,selectedId} = this.state
        console.log("getData", this.props.history)
        return (
            <div>
                <div style={{ padding: '20px' }} className={`selection-bar ${isSelectionBar && selectedId.length > 0 ? "_block" : " "}`} >
                    <span style={SpanStyles} onClick={() => { this.setState({ isSelectionBar: false }); selectedId.length = 0 }}><i className="fa fa-close" aria-hidden="true"></i></span>
                    <span style={Span} >{selectedId.length} selected</span>
                    <div onClick={this.unsubscribeRecipient}>
                        <span style={SpanStyles}><i className="fas fa-minus-circle"></i></span>
                        <span style={SpanStyles} >Delete</span>
                    </div>
                </div>
                <Container fluid>
                    <Row>
                    <Campaign_details id={this.props.history.location.state&&this.props.history.location.state.id} />
                    </Row>
                    <Row className='mt-5'>
                        <Col md={1}className='Recipients_details'><a href='#'><h1>1</h1><span >LISTS</span></a></Col>
                        <Col md={1}className='Recipients_details'><a href='#'><h1>1</h1><span >WON</span></a></Col>
                        <Col md={10} className='align-right' >
                            <div className='w-h-25' >
                                <button className='btn sequence_btn btn-md'>ADD RECIPIENTS</button>
                                <div className='child ml-3'>
                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                        <span className='font_icon'><i className="fa fa-arrow-down" style={{ borderBottom: '2px solid silver' }}></i></span>
                                    </a>
                                </div>
                                <div className='child ml-3'>
                                    <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                        <span className='font_icon'><i className="fa fa-undo" aria-hidden="true"></i></span>
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className=' mt-3 input_search_div'>
                        <Col md={4}>
                            <div className='grand_parent' >
                                <div className='input_field'>
                                    <Input type='email' className='in' placeholder='Search' />
                                    <div className='child mt-2'>
                                        <a href='' onClick={(e) => { e.preventDefault(); alert('msg') }}>
                                            <span className='font_icon'><i className="fa fa-search" aria-hidden="true"></i></span>
                                        </a>
                                    </div>
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
                                    <th>ADDED ON</th>
                                    <th>SENT ON</th>

                                </tr>
                            </thead>
                            <tbody>
                                {getData && getData.map((item, index) => (
                                    <tr key={index}>
                                        <td><input onChange={()=>this.showSelectionBar(item.id)} type='checkbox' /></td>
                                        <td>{item.email}</td>
                                        <td>{item.full_name}</td>
                                        <td>{item.created_date_time.substring(5, 10)}</td>
                                        <td>{}</td>
                                    </tr>
                                ))}
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
}
const mapStateToProps = (state) => {
    // console.log('state',state.CampaignPeopleReducer&&state.CampaignPeopleReducer.campaignPeopleData )
    return {
        campaignOverviewData: state.CampaignOverviewReducer.CampaignOverviewData,
        getData: state.CampaignPeopleReducer && state.CampaignPeopleReducer.campaignPeopleData
    };
};
const mapDispatchToProps = dispatch => ({
    CampaignPeopleAction: (id) => dispatch(CampaignPeopleAction(id)),
    RecipientUnsubscribe: (id) =>{ dispatch(unsubscribeRecipientAction(id)) }
});
export default connect(mapStateToProps, mapDispatchToProps)(Recipients)
