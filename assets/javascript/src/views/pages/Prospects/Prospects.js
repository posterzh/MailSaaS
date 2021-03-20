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
import {
	filterRecipients,
	countRecipients,
} from "../../../redux/action/ProspectsAction";

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
		key: 'lead_status',
		value: 'Status',
	},
	{
		key: 'campaign_count',
		value: 'Campaign',
	},
	{
		key: 'sent_count',
		value: 'Sent',
	},
	{
		key: 'engaged_count',
		value: 'Engaged',
	},
];

let filters = [
	{
		key: 'Teammate',
		options: ['karl920814@gmail.com', 'omaid@faizyar.com']
	},
	{
		key: 'email',
		options: []
	},
	{
		key: 'name',
		options: []
	}
];

class Prospects extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'total',
			detailItem: null,
			importContactsModal: false,
			detailModal: false,
		};
	}

	componentDidMount() {
		this.props.filterRecipients();
		this.props.countRecipients();
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.recipients !== this.props.recipients) {
			const getUniqueArray = (array, field) => array.map(x => x[field]).filter((v, i, a) => a.indexOf(v) === i);
			filters[1].options = getUniqueArray(nextProps.recipients, 'email')
			filters[2].options = getUniqueArray(nextProps.recipients, 'name')
		}
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

	showDetailModal = (item) => {
		this.setState({ detailItem: item });

		this.setState({ detailModal: true });
	}

	closeDetailModal = () => {
		this.setState({ detailModal: false });
	}

	onTotalClick = () => {
		this.setState({ selected: 'total' })
		this.props.filterRecipients();
	}

	onInCampaignClick = () => {
		this.setState({ selected: 'in-campaign' })
		this.props.filterRecipients();
	}

	onEngagedClick = () => {
		this.setState({ selected: 'engaged' })
		this.props.filterRecipients({ engaged: true });
	}

	onLeadsClick = () => {
		this.setState({ selected: 'leads' })
		this.props.filterRecipients({ leads: true });
	}

	onBouncesClick = () => {
		this.setState({ selected: 'bounces' })
		this.props.filterRecipients({ bounces: true });
	}

	onUnsubscribesClick = () => {
		this.setState({ selected: 'unsubscribes' })
		this.props.filterRecipients({ unsubscribe: true });
	}

	render() {
		const { importContactsModal, detailModal } = this.state;
		const { recipients, counts } = this.props;

		return (
			<div className="prospect-main-container">
				<PageHeader
					current="Prospects"
					parent="Prospects"
					showStatus={false}
				/>
				<PageContainer title={"Prospect"} showHelper={false}>
					<Row>
						<Col md="2" sm="4" className="sidenav-toggler" onClick={this.onTotalClick}>
							<Card className={this.state.selected === 'total' ? "bg-info" : "bg-light"}>
								<CardBody className="text-center p-3">
									<CardTitle className="m-0">
										<h3 className="text-white heading m-0">
											<div>{counts && counts.total}</div>
											<div>Total</div>
										</h3>
									</CardTitle>
								</CardBody>
							</Card>
						</Col>
						<Col md="2" sm="4" className="sidenav-toggler" onClick={this.onInCampaignClick}>
							<Card className={this.state.selected === 'in-campaign' ? "bg-info" : "bg-light"}>
								<CardBody className="text-center p-3">
									<CardTitle className="m-0">
										<h3 className="text-white heading m-0">
											<div>{counts && counts.in_campaign}</div>
											<div>In Campaign</div>
										</h3>
									</CardTitle>
								</CardBody>
							</Card>
						</Col>
						<Col md="2" sm="4" className="sidenav-toggler" onClick={this.onEngagedClick}>
							<Card className={this.state.selected === 'engaged' ? "bg-info" : "bg-light"}>
								<CardBody className="text-center p-3">
									<CardTitle className="m-0">
										<h3 className="text-white heading m-0">
											<div>{counts && counts.engaged}</div>
											<div>Engaged</div>
										</h3>
									</CardTitle>
								</CardBody>
							</Card>
						</Col>
						<Col md="2" sm="4" className="sidenav-toggler" onClick={this.onLeadsClick}>
							<Card className={this.state.selected === 'leads' ? "bg-info" : "bg-light"}>
								<CardBody className="text-center p-3">
									<CardTitle className="m-0">
										<h3 className="text-white heading m-0">
											<div>{counts && counts.leads}</div>
											<div>Leads</div>
										</h3>
									</CardTitle>
								</CardBody>
							</Card>
						</Col>
						<Col md="2" sm="4" className="sidenav-toggler" onClick={this.onBouncesClick}>
							<Card className={this.state.selected === 'bounces' ? "bg-info" : "bg-light"}>
								<CardBody className="text-center p-3">
									<CardTitle className="m-0">
										<h3 className="text-white heading m-0">
											<div>{counts && counts.bounces}</div>
											<div>Bounces</div>
										</h3>
									</CardTitle>
								</CardBody>
							</Card>
						</Col>
						<Col md="2" sm="4" className="sidenav-toggler" onClick={this.onUnsubscribesClick}>
							<Card className={this.state.selected === 'unsubscribes' ? "bg-info" : "bg-light"}>
								<CardBody className="text-center p-3">
									<CardTitle className="m-0">
										<h3 className="text-white heading m-0">
											<div>{counts && counts.unsubscribes}</div>
											<div>Unsubscribes</div>
										</h3>
									</CardTitle>
								</CardBody>
							</Card>
						</Col>
					</Row>

					<Row>
						<Tables
							titles={tableTitle} // required
							tablePropsData={recipients}   // required
							showSelect={true}    // optional
							showPagination={true}   // optional
							selectedCallback={this.selectedCallback}      // get call back for select object.
							paginationCallback={this.paginationCallback}     // get callback of page change.
							onDetail={this.showDetailModal}
							filters={filters}   // optional to enable filter
							searchKeys={['email', 'name']}  // optional to enable search
						/>
					</Row>

					<Button
						className="btn-icon btn-2 rounded-circle fixed-bottom-right-btn"
						color="info"
						type="button"
						onClick={(e) => {
							e.preventDefault();
							this.importContacts();
						}}
					>
						<span className="btn-inner--icon">
							<i className="fa fa-plus" />
						</span>
					</Button>

					<ImportContactsModal
						isOpen={importContactsModal}
						// data={this.state.editItem}
						close={this.closeImportContactsModal}
					// create={this.createMailAccount}
					// update={this.updateMailAccount}
					/>

					<DetailModal
						isOpen={detailModal}
						data={this.state.detailItem}
						close={this.closeDetailModal}
					// create={this.createMailAccount}
					// update={this.updateMailAccount}
					/>
				</PageContainer>
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	recipients: state.prospects.recipients,
	counts: state.prospects.counts,
});

export default connect(mapStateToProps, {
	filterRecipients,
	countRecipients,
})(Prospects);
