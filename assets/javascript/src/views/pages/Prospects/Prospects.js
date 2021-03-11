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
	Button,
	Form,
	FormGroup,
	CardTitle
} from 'reactstrap'
import PageHeader from "../../../components/Headers/PageHeader";
import PageContainer from "../../../components/Containers/PageContainer";
import Tables from "../../../components/Tables";
import ImportContactsModal from "./components/ImportContactsModal"
import DetailModal from "./components/DetailModal"

class Prospects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'total',
			importContactsModal: false,
			detailModal: false,
		};
	}

	componentDidMount() {

	}

	paginationCallback = (value) => {
		console.log("value : ", value)
	}

	selectedCallback = (value) => {
		console.log("return=" + value);
	}

	importContacts = () => {
		this.showImportContactsModal();
	}

	showImportContactsModal = () => {
		this.setState({ importContactsModal: true });
	}

	closeImportContactsModal = () => {
		this.setState({ importContactsModal: false });
	}

	showDetailModal = () => {
		this.setState({ detailModal: true });
	}

	closeDetailModal = () => {
		this.setState({ detailModal: false });
	}

	render() {
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
				email: 'janak@gmail.com',
				name: 'Azazul',
				created: '10-10-2020',
				status: 'Passed',
				campaign: '1458',
				sent: '10',
				engaged: '2',
				tasks: '8'
			},
			{
				email: 'ajju@gmail.com',
				name: 'janak',
				created: '10-10-2020',
				status: 'Passed',
				campaign: '1458',
				sent: '10',
				engaged: '2',
				tasks: '8'
			}
		];
		const filters = [
			{
				key: 'email',
				options: ['janak@gmail.com', 'ajajul@gmail.com', 'mikin@gmail.com', 'ajju@gmail.com']
			},
			{
				key: 'name',
				options: ['janak', 'ajajul', 'mikin']
			}
		];

		const { importContactsModal, detailModal } = this.state;

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
									<Input id="exampleFormControlSelect1" className="form-control-sm" type="select" defaultValue="any">
										<option value="any">Any</option>
									</Input>
								</FormGroup>
							</Form>
						</Col>
					</Row>
					
					<Row>
						<Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'total' }) }}>
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
						<Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'in-campaign' }) }}>
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
						<Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'engaged' }) }}>
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
						<Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'leads' }) }}>
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
						<Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'bounces' }) }}>
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
						<Col md="2" sm="4" className="sidenav-toggler" onClick={() => { this.setState({ selected: 'unsubscribes' }) }}>
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

					<Row className="justify-content-end">
						<Button
							onClick={(e) => {
								e.preventDefault();
								this.importContacts();
							}}
							className="btn-icon"
							color="danger"
							type="button"
						>
							<span className="btn-inner--icon">
								<i className="fa fa-plus" />
							</span>
						</Button>
					</Row>

					<Row>
						<Tables
							titles={tableTitle} // required
							tablePropsData={tableData}   // required
							showSelect={true}    // optional
							showPagination={true}   // optional
							selectedCallback={this.selectedCallback}      // get call back for select object.
							paginationCallback={this.paginationCallback}     // get callback of page change.
							onDetail={this.showDetailModal}
							filters={filters}   // optional to enable filter
							searchKeys={['email', 'name']}  // optional to enable search
						/>
					</Row>

					<ImportContactsModal
            isOpen={importContactsModal}
            // data={this.state.editItem}
            close={this.closeImportContactsModal}
            // create={this.createMailAccount}
            // update={this.updateMailAccount}
          />

					<DetailModal
            isOpen={detailModal}
            // data={this.state.editItem}
            close={this.closeDetailModal}
            // create={this.createMailAccount}
            // update={this.updateMailAccount}
          />
				</PageContainer>
			</div>
		)
	}
}

export default Prospects
