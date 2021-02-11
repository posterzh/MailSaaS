import axios from 'axios';
import { API_BASE_URL } from '../../Constants'
const Api = {}
// for register
Api.RegisterApi = (user) => {
    return axios.post(`${API_BASE_URL}/rest-auth/registration/`, user)
}

// for login
Api.LoginApi = (loginuser) => {
    return axios.post(`http://127.0.0.1:8000/rest-auth/login/`, loginuser)
}

// for campaign_start api
Api.StartApi = (data, token) => {
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/campaign/start/',
        data: {
            title: data.title,
            from_address: data.from_address
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}


// for campaign_recipient 
Api.RecipientApi = (recipientData, token) => {
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/campaign/recipients/',
        data: {
            csvFile: recipientData.csvFile,
            email: `${recipientData.email}`,
            campaign: recipientData.campaign,
            options: `${recipientData.options}`,

        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// for campaign_option api
Api.OptionApi = (optionData, token) => {
    console.log('OptionAPI------:', optionData);
    return axios({
        method: 'PUT',
        url: 'http://127.0.0.1:8000/campaign/options/',
        data: {

            ...optionData
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}
// for campaign_compose

Api.CampaignComposeApi = (token, data) => {
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/campaign/message/',
        data: {
            "normal":
            {
                "campaign": 1,
                "subject": "Sub 1",
                "email_body": "This is first email body"
            },
            "follow_up":
                [
                    {
                        "waitDays": 5,
                        "subject": "sub F 1",
                        "email_body": "FU email body 1"
                    },
                    {
                        "waitDays": 4,
                        "subject": "sub F 2",
                        "email_body": "FU email body 2"
                    }
                ],
            "drips":
                [
                    {
                        "waitDays": 5,
                        "subject": "sub D 1",
                        "email_body": "Drip email body 1"
                    },
                    {
                        "waitDays": 4,
                        "subject": "sub D 2",
                        "email_body": "Drip email body 2"
                    }
                ],
            "onLinkClick":
                [
                    {
                        "waitDays": 5,
                        "url": "www.google.com",
                        "subject": "sub onLinkClick 1",
                        "email_body": "onLinkClick email body 1"
                    },
                    {
                        "waitDays": 4,
                        "url": "www.google.com",
                        "subject": "sub onLinkClick 2",
                        "email_body": "onLinkClick email body 2"
                    }
                ]

        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// campaign preview
Api.CampaignPreviewApi = (token, key) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/personalize/1/',

        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })


}

// campaign_savecampaign (put)
Api.CampaignSaveApi = (token, data) => {
    return axios({
        method: 'PUT',
        url: 'http://127.0.0.1:8000/campaign/savecamp/1/',
        data: {
            "startCampaign": false
        },
        headers: {
            "Authorization": `Bearer ${token}`,

        }

    })
}

// Campaign save (get)
Api.CampaignSavegetApi = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/savecamp/1/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// campaign leadcatcher
Api.CampaignLeadcatcher = (token, data) => {
    return axios({
        method: "GET",
        url: 'http://127.0.0.1:8000/campaign/leadscatcher/',
        data: {
            'campaign': 1
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// campaign get-overview
Api.CampaignGetOverview = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/get-overview/1/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}
// campaign recipient people (get)
Api.CampaignRecipientPeople = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/recipients/people/1/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// campaign recipient peoples (put)
Api.CampaignRecipienputPeople = (token) => {
    return axios({
        method: 'Put',
        url: 'http://127.0.0.1:8000/campaign/recipients/people/1/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// campaign recipient (put) (api for update recipient details)   
// its not working
Api.CampaignUpdateRecipient = (token, data) => {
    return axios({
        method: 'PUT',
        url: 'http://127.0.0.1:8000/campaign/recipients/1/',
        data: {
            'campaign': 1,
            'email': 'developer@externlabs.com',
            'password': 'developer@externlabs'
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })

}

// campaignmessage
Api.CampaignMessage = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/campaign-message/1/',
        data: {

        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// campaign prospects
Api.CampaignProspects = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/prospects/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// campaign view prospects
Api.CampaignViewProspects = (token, key) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/prospects/10/',
        data: {},
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// user settings
Api.UserSetting = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/users/user-setting/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// update user setting
Api.UserUpdateSetting = (token, data) => {
    return axios({
        method: 'PUT',
        url: 'http://127.0.0.1:8000/users/user-setting/',
        data: {
            'full_name': 'omaidf',
            'email': 'omaid123@gmail.com'
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// change password
// not working
Api.ChangePassword = (token, data) => {
    return axios({
        method: 'PUT',
        url: 'http://127.0.0.1:8000/users/change-password/',
        data: {
            'old_password': 'keshav@9784',
            'new_password': 'keshav@7014',
            'new_confirm_password': 'keshav@7014',
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

// mail sender delete
Api.MailSenderDelete = (token) => {
    return axios({
        method: 'DELETE',
        url: 'http://127.0.0.1:8000/mail/sender/1/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })
}

// unsubscribe delete
Api.UnsubscribeDelete = (token, data) => {
    return axios({
        method: 'PUT',
        url: 'http://127.0.0.1:8000/unsubscribes/unsubcribedelete/',
        data: {
            "data": [3]
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
    return axios.post(`${API_BASE_URL}/rest-auth/login/`, loginuser)
}
Api.StartCampaignApi = (data, token) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/campaign/start/`,
        data: {
            title: data.title,
            from_address: data.from_address
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

Api.RecipientApi = (formData, token) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/campaign/recipients/`,
        data: { formData },
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })

}
Api.CampaignTableDataApi = (token) => {
    return axios({
        method: 'GET',
        url: `${API_BASE_URL}/campaign/view/`,
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}
Api.MailSenderApi = (mailData, token) => {
    console.log(mailData, token, "data")
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}mail/sender/`,
        data: mailData,
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })
}
Api.MailGetDataApi = (token) => {
    return axios({
        method: 'GET',
        url: `${API_BASE_URL}/mail/sender/`,
    })
}

Api.fetchUnsbcribed = (token) => {
    return axios({
        method: 'GET',
        url: `${API_BASE_URL}/unsubscribes/unsubcribeview/`,
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}



Api.demostart = (token, data) => {
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/campaign/start/`,
        data: {

            "title": "campaign",
            "from_address": 2
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })
}
Api.demorecipient = (token, data) => {
    let formdata=new FormData();
    formdata.append("option","[2]"),
    formdata.append("campaign","3"),
    formdata.append("email", "keshav@gmail.com")
    return axios({
        method: 'POST',
        url: `${API_BASE_URL}/campaign/recipients/`,
        
            data:formdata,
        
            headers: {
                "Authorization": `Bearer ${token}`,
            }
    
    })
}

Api.GetAllCampaigns=(token)=>{
    return axios({
        url:`${API_BASE_URL}/campaign/view/`,
        data:{},
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

export default Api;












