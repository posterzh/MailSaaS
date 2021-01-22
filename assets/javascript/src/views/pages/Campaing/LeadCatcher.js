import React, { Component } from 'react'
// importing reacstrap elements
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardBody,
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
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class LeadCatcher extends Component {

  constructor(){
    super();
    this.state = {
      dropdownOpen: false
    }
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {

    const {dropdownOpen} = this.state;
    return (
    <div >
      <div className="Barcontainer">  
        <div>
          <Input  className="searchbar" type='text' placeholder='search'></Input>
        </div>
        <div>
        <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
      <DropdownToggle className="dropdown_campaign" caret>
        Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Header</DropdownItem>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem text>Dropdown Item Text</DropdownItem>
        <DropdownItem>Action (disabled)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </div>
        <div>
        <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret>
        Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Header</DropdownItem>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem text>Dropdown Item Text</DropdownItem>
        <DropdownItem>Action (disabled)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </div>
        <div>
        <Dropdown isOpen={dropdownOpen} toggle={this.toggle}>
      <DropdownToggle caret>
        Dropdown
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem>Header</DropdownItem>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem text>Dropdown Item Text</DropdownItem>
        <DropdownItem>Action (disabled)</DropdownItem>
      </DropdownMenu>
    </Dropdown>
        </div>
        <div>
          <Button />
        </div>
      </div>
      <div>
        <Card className="table">
          <table >
            <thead>
              <tr>
                <th scope="col" className="tableheader1" ><input type="checkbox" /></th>
                <th scope="col" className="tableheader2">Person</th>
                <th scope="col" className="header_created">Campaign</th>
                <th scope="col" className="header_assigned">AssignedTo</th>
                <th scope="col" className="header_recipents">LeadDate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="check_box"><input type="checkbox" /></td>
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