import React, { Component } from 'react'
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

export class LeadCatcher extends Component {
  render() {
    return (
      <div>
        <div>
          <Card>
            <table class="table">
  <thead>
    <tr>
      <th scope="col" className="tableheader1" ><input type="checkbox"/></th>
      <th scope="col" className="tableheader2">Person</th>
      <th scope="col" className="header_created">Campaign</th>
      <th scope="col" className="header_assigned">AssignedTo</th>
      <th scope="col" className="header_recipents">LeadDate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="check_box"><input type="checkbox"/></td>
      <td className="Campaign_title">Person name</td>
      <td className="Created">Campaign name</td>
      <td className="Assigned">Omaid Faizyar</td>
      <td className="Recipient">00:00</td>
    
    </tr>
  </tbody>
</table>
            </Card>
          </div>
        
      </div>
    )
  }
}

export default LeadCatcher