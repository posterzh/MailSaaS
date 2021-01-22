import React, { Component } from 'react'
import Container from 'reactstrap/lib/Container'

// importing reacstrap elements
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Form,
  Input,
  ListGroupItem,
  ListGroup,
  Media,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  // Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";




export class Campaign extends Component {
  render() {
    return (
<div>   
  <div>
    <Input
    style={{width:"400px"}}
    placeholder="search"
    />
    </div>
 <div class="Campaing_table_container" style={{marginleft:"20px"}}>
  <Card>  
<table class="table">
  <thead>
    <tr>
      <th scope="col" className="tableheader1" ><input type="checkbox"/></th>
      <th scope="col" className="tableheader2">Campaign Title</th>
      <th scope="col" className="header_created">Created</th>
      <th scope="col" className="header_assigned">Assigned</th>
      <th scope="col" className="header_recipents">RECIPIENTS</th>
      <th scope="col" className="header_sent">SENT</th>
      <th scope="col" className="header_leads">LEADS</th>
      <th scope="col" className="header_replies">REPLIES</th>
      <th scope="col" className="header_open">OPENS</th>
      <th scope="col" className="header_bounces">BOUNCES</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="check_box"><input type="checkbox"/></td>
      <td className="Campaign_title">January 19 Outreach</td>
      <td className="Created">0</td>
      <td className="Assigned">0</td>
      <td className="Recipient">0</td>
      <td className="Sent">0</td>
      <td className="Leads" >0</td>
      <td className="Replies">0</td>
      <td className="Open">0</td>
      <td className="Bounces">0</td>
    </tr>
  </tbody>
</table>
</Card>
</div>
  </div>
    )
  }
}

export default Campaign