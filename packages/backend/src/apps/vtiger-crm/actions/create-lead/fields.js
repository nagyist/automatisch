export const fields = [
  {
    label: 'Salutation',
    key: 'salutation',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    options: [
      { label: 'Mr.', value: 'Mr.' },
      { label: 'Ms.', value: 'Ms.' },
      { label: 'Mrs.', value: 'Mrs.' },
      { label: 'Dr.', value: 'Dr.' },
      { label: 'Prof.', value: 'Prof.' },
    ],
  },
  {
    label: 'First Name',
    key: 'firstName',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Last Name',
    key: 'lastName',
    type: 'string',
    required: true,
    description: '',
    variables: true,
  },
  {
    label: 'Company',
    key: 'company',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Primary Email',
    key: 'primaryEmail',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Office Phone',
    key: 'officePhone',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Designation',
    key: 'designation',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listLeadOptions',
        },
        {
          name: 'parameters.designation',
          value: 'designation',
        },
      ],
    },
  },
  {
    label: 'Mobile Phone',
    key: 'mobilePhone',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Industry',
    key: 'industry',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listLeadOptions',
        },
        {
          name: 'parameters.industry',
          value: 'industry',
        },
      ],
    },
  },
  {
    label: 'Website',
    key: 'website',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Annual Revenue',
    key: 'annualRevenue',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Lead Source',
    key: 'leadSource',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listLeadOptions',
        },
        {
          name: 'parameters.leadSource',
          value: 'leadsource',
        },
      ],
    },
  },
  {
    label: 'Lead Status',
    key: 'leadStatus',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listLeadOptions',
        },
        {
          name: 'parameters.leadStatus',
          value: 'leadstatus',
        },
      ],
    },
  },
  {
    label: 'Assigned To',
    key: 'assignedTo',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Fax',
    key: 'fax',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Number of Employees',
    key: 'numberOfEmployees',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Twitter Username',
    key: 'twitterUsername',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Record Currency',
    key: 'recordCurrencyId',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listRecordCurrencies',
        },
      ],
    },
  },
  {
    label: 'Email Opt-in',
    key: 'emailOptin',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listLeadOptions',
        },
        {
          name: 'parameters.emailOptin',
          value: 'emailoptin',
        },
      ],
    },
  },
  {
    label: 'SMS Opt-in',
    key: 'smsOptin',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listLeadOptions',
        },
        {
          name: 'parameters.smsOptin',
          value: 'smsoptin',
        },
      ],
    },
  },
  {
    label: 'Language',
    key: 'language',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listLeadOptions',
        },
        {
          name: 'parameters.language',
          value: 'language',
        },
      ],
    },
  },
  {
    label: 'Source Campaign',
    key: 'sourceCampaignId',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listCampaignSources',
        },
      ],
    },
  },
  {
    label: 'Country',
    key: 'country',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listLeadOptions',
        },
        {
          name: 'parameters.country',
          value: 'country',
        },
      ],
    },
  },
  {
    label: 'Street',
    key: 'street',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'PO Box',
    key: 'poBox',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Postal Code',
    key: 'postalCode',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'City',
    key: 'city',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'State',
    key: 'state',
    type: 'dropdown',
    required: false,
    description: '',
    variables: true,
    source: {
      type: 'query',
      name: 'getDynamicData',
      arguments: [
        {
          name: 'key',
          value: 'listLeadOptions',
        },
        {
          name: 'parameters.state',
          value: 'state',
        },
      ],
    },
  },
  {
    label: 'Description',
    key: 'description',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
  {
    label: 'Lead Image',
    key: 'leadImage',
    type: 'string',
    required: false,
    description: '',
    variables: true,
  },
];