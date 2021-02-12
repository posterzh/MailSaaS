import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Row, Col, Label, Input, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
// import {Prospects} from "../../../redux/action/"
import {ProspectActionData} from '../../../redux/action/ProspectsAction'
class Prospects extends Component {
    constructor(props) {
        super(props);
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
    componentDidMount() {
        this.props.ProspectActionData();
        console.log("asdfghjkldfghjkldtfyghj",this.props)
      }
      

    render() {
const {prospectData}=this.props;
        return (
            <div>
                <div className='campaign_navbar' >
                    <h1 style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>Prospects</h1>
                    <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i class="fa fa-question-circle-o" aria-hidden="true"></i></p>
                </div>
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
                        <Col md='1' className=' prospect_details'><h1>33</h1><span >TOTAl</span></Col>
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
                                {
                                    prospectData&& prospectData.map((item,index)=>{
                                        console.log("item",item);
                                       return <tr>
                                           <td key={index}><input type='checkbox'></input></td>
                                            <td value={index}>{item.email}</td>
                                            <td value={index}>{item.name}</td>
                                            <td value={index}>{item.created}</td>
                                            <td value={index}>{item.status}</td>
                                            <td value={index}>{item.campaign}</td>
                                            <td value={index}>{item.sent}</td>
                                            <td value={index}>{item.id}</td>
                                            <td value={index}>{item.name}</td>
                                        </tr>
                                    })
                                }
                                {/* <tr>
                                    <td><input type='checkbox' /></td>
                                    <td>EMAIL</td>
                                    <td>NAME</td>
                                    <td>CREATED</td>
                                    <td>STATUS</td>
                                    <td>CAMPAGINS</td>
                                    <td>SENT</td>
                                    <td>ENGAGED</td>
                                    <td>TASKS</td>
                                </tr> */}
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>
        )
    }
}
// export default Prospects

const mapStateToProps=(state)=>
{
    console.log("cheking state",typeof state.ProspectsGetReducer.prospectData)
    return{
        prospectData:state.ProspectsGetReducer.prospectData
    }
}

const mapDispatchToProps=dispatch=>({
    ProspectActionData:prospectData=>{
        dispatch(ProspectActionData(prospectData))
    }
})
export default connect(mapStateToProps,mapDispatchToProps)(Prospects)
// Message Deepika Maheshwari















