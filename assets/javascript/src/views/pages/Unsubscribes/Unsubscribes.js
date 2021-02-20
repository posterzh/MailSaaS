import React from 'react'
import { TabContent, TabPane, NavLink, Nav, NavItem } from 'reactstrap'
import { Container, Row } from 'reactstrap'
import Domainpage from './Domainpage'
import Addresstable from "./Addresstable"
import classnames from 'classnames';
import { fetchUnsubscribeAction, unsubscribeUsersAction } from '../../../redux/action/UnsubscribeActions'
import { Component } from 'react';
import { connect } from "react-redux";
import '../../../../../scss/custom/custom.scss'
import { array } from 'prop-types'
const SpanStyles = {
  paddingRight: "10px",
  paddingLeft:"10px",
  color: "white",
   fontSize: "25px",
   cursor:'pointer'
};
const Span = {
  paddingRight: "20px",
  paddingLeft:"20px",
  color: "white",
   fontSize: "25px",
   borderRight:"1px dashed",
   marginRight:"10px"
};
class Unsubscribes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      selectedId: [],
      checked: false,
      isSelectionBar:true
    }
  }
  
  toggle = tab => {
    if (this.state.activeTab !== tab)
      this.setState({ activeTab: tab })
  }
  componentDidMount() {
    this.props.fetchUnsbcribed()
  }
  showSelectionBar = (id) => {
  let array=[...this.state.selectedId]
    this.setState({
      isSelectionBar: true,
    })
    for (let index = 0; index < array.length; index++) {
      if(id===array[index]){
        const index = array.indexOf(id);
        if (index > -1) {
          array.splice(index, 1);
        }
        this.setState({
          selectedId:array.length
        })
      }
      else{
        this.state.selectedId.push(id)
      }
      
    }
    
    console.log( this.state.selectedId," this.state.selectedId")
  }
  UnsubscribeDelete = () => {
    let data = this.state.selectedId
    this.props.unsubscribeUsers(data)
  }
  render() {
    const { isSelectionBar, selectedId } = this.state;
    console.log(this.props.data, "dataaaaaaaa")
    return (
      <div>
        <div>
          <div className='campaign_navbar' >
            <p style={{ color: 'white', fontSize: '20px', marginLeft: '20px', marginTop: "20px" }}>Unsubscribes</p>
            <p style={{ color: "white", fontSize: "20px", marginTop: "20px", marginRight: "20px" }}><i className="fa fa-question-circle-o" aria-hidden="true"></i></p>
          </div>
          <div style={{padding:'20px'}} className={`selection-bar ${isSelectionBar ? "_block" : " "}`} >
            <span style={SpanStyles} onClick={() => this.setState({ isSelectionBar: false })}><i className="fa fa-close" aria-hidden="true"></i></span>
            <span style={Span} >{selectedId.length} selected</span>
            <div onClick={this.UnsubscribeDelete}>
              <span style={SpanStyles}><i class="fas fa-minus-circle"></i></span>
              <span style={SpanStyles} >Delete</span>
            </div>
          </div>
        </div>
        <Container fluid>
          <Row className="mt-3 ml-1">
            <div>
              <input className="searchbox-unsubscribe" type="search" placeholder="search"></input>
            </div>
            <div className="unsubscribe-buttonsdiv">
              <div>
                <button className="refresh-button" ><i style={{ fontSize: "15px" }} class="fa fa-refresh" aria-hidden="true"></i>
                  <span onClick={() => window.location.reload()} style={{ marginLeft: "10px" }}>REFRESH</span></button></div>
              <div><button className="Export-button">EXPORT</button></div>
            </div>
          </Row>
          <Row className="mt-5 ml-1">
            <Nav tabs style={{ borderBottom: "1px solid #ccc", width: "99%" }} >
              <NavItem className="address-nav"><NavLink className={classnames({ active1: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }}><span style={{ color: 'black' }}>ADDRESS</span></NavLink></NavItem>
              <NavItem className="domain-nav"><NavLink className={classnames({ active2: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}><span style={{ color: 'black' }}>DOMAIN</span></NavLink></NavItem>
            </Nav>
          </Row>
          <Row>
            <TabContent activeTab={this.state.activeTab} style={{ width: "100%" }}>
              <TabPane tabId="1">
                <Addresstable showSelectionBar={this.showSelectionBar} data={this.props.data} />
              </TabPane>
              <TabPane tabId="2">
                <Domainpage />
              </TabPane>
            </TabContent>
          </Row>
        </Container>
        <div className='plus-button-div'>
          <div className='new_add_button'>
            <span className="plusicon">+</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.UnsubscribeReducer.unsubscribeData && state.UnsubscribeReducer.unsubscribeData, "state.UnsubscribeReducer.unsubscribeData")
  return {
    data: state.UnsubscribeReducer.unsubscribeData
  };
};
const mapDispatchToProps = dispatch => ({
  fetchUnsbcribed: () => { dispatch(fetchUnsubscribeAction()) },
  unsubscribeUsers: (data) => { dispatch(unsubscribeUsersAction(data)) },

});
export default connect(mapStateToProps, mapDispatchToProps)(Unsubscribes);