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
        value: 'ASSIGNED',
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
        link: '/app/admin/campaign/{{id}}/details-overview',
        id: "id"
    },
    {
        key: 'name',
        value: 'NAME',
    },
    {
        key: 'created_date_time',
        value: 'ADDED ON',
    },
    {
        key: 'updated_date_time',
        value: 'SEND ON',
    }
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