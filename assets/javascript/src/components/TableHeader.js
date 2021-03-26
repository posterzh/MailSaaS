export const campaignListTable = [
    {
        key: 'title',
        value: 'Title',
        link: '/app/admin/campaign/{{id}}/details-overview',
        id: "id"
    },
    {
        key: 'created',
        value: 'CREATED',
    },
    {
        key: 'assigned',
        value: 'EMAIL ACCOUNT',
    },
    {
        key: 'recipients',
        value: 'RECIPIENTS',
    },
    {
        key: 'sent',
        value: 'SENT',
    },
    {
        key: 'leads',
        value: 'LEADS',
    },
    {
        key: 'replies',
        value: 'REPLIES',
    },
    {
        key: 'opens',
        value: 'OPENS',
    },
    {
        key: 'bounces',
        value: 'BOUNCES',
    }
];

export const recipientsTable = [
    {
        key: 'email',
        value: 'EMAIL',
        id: "id"
    },
    {
        key: 'name',
        value: 'NAME',
    },
    {
        key: 'created',
        value: 'ADDED ON',
    },
    {
        key: 'updated',
        value: 'SEND ON',
    },
];

export const recipientsFilters = [
	{
		key: 'email',
		options: []
	},
	{
		key: 'name',
		options: []
	}
];