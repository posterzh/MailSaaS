import axios from 'axios';
import { API_BASE_URL } from '../../Constants'
const Api = {}
// for register
Api.RegisterApi = (user) => {
  return axios.post(`${API_BASE_URL}/rest-auth/registration/`, user)
}

// for login
Api.LoginApi = (loginuser) => {
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

// for campaign_recipient 
Api.RecipientApi = (recipientData, token) => {
  const formData = new FormData();
  // formData.append('csvfile_op1', recipientData.csvFile);
  formData.append('email', recipientData.email);
  formData.append('option', recipientData.option);
  formData.append('campaign', recipientData.campaign)
  console.log('rec api',formData);
  return axios({
    method: 'POST',
    url: `${API_BASE_URL}/campaign/recipients/`,
    data: formData,
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
    url: `${API_BASE_URL}/campaign/options/`,
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
    url: `${API_BASE_URL}/campaign/message/`,
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

// campaign GET preview
Api.CampaignPreviewApi = (token, key) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/personalize/${key}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// CAMPAIGN UPDATE PREVIEW
Api.CampaignUpdatePreviewApi = (token, id) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/campaign/personalize/2/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// Campaign save (get)
Api.CampaignSendGetApi = (token,id) => {
  // console.log('send',id);
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/savecamp/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign_savecampaign (put)
Api.CampaignSaveApi = (saveData,token) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/campaign/savecamp/26/`,
    data:saveData,
    headers: {
      "Authorization": `Bearer ${token}`,

    }

  })
}

// campaign leadcatcher
Api.CampaignLeadCatcher = (token, data) => {
  return axios({
    method: "GET",
    url: `${API_BASE_URL}/campaign/leadscatcher/`,
    data: {
      'campaign': 1
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign get-overview
Api.CampaignOverview = (token, id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/overview/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
// campaign recipient people (get)
Api.CampaignRecipientPeople = (token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/recipients/people/1/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign recipient peoples (put)
Api.CampaignRecipienputPeople = (token) => {
  return axios({
    method: 'Put',
    url: `${API_BASE_URL}/campaign/recipients/people/1/`,
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
    url: `${API_BASE_URL}/campaign/recipients/1/`,
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
    url: `${API_BASE_URL}/campaign/campaign-message/1/`,
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
    url: `${API_BASE_URL}/campaign/prospects/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign view prospects
Api.CampaignViewProspects = (token, key) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/prospects/10/`,
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
    url: `${API_BASE_URL}/users/user-setting/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// update user setting
Api.UserUpdateSetting = (token, data) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/users/user-setting/`,
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
    url: `${API_BASE_URL}/users/change-password/`,
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
    url: `${API_BASE_URL}/mail/sender/1/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }

  })
}

// unsubscribe delete
Api.UnsubscribeDelete = (token, data) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/unsubscribes/unsubcribedelete/`,
    data: {
      "data": [3]
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
  // return axios.post(`${API_BASE_URL}/rest-auth/login/`, loginuser)
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
  return axios({
    method: 'POST',
    url: `${API_BASE_URL}/mail/addmailaccount/`,
    data: mailData,
    headers: {
      "Authorization": `Bearer ${token}`,
    }

  })
}
Api.MailGetDataApi = (token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/mail/addmailaccount/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })

}
Api.MailAccountDelete = (token, id) => {
  return axios({
    url: `${API_BASE_URL}/mail/updatedeletemailaccount/${id}/`,
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
}

Api.MailAccountUpdateApi = (token, data, id) => {
  return axios({
    url: `${API_BASE_URL}/mail/updatedeletemailaccount/${id}/`,
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    data: data
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
  let formdata = new FormData();
  formdata.append("option", "[2]"),
    formdata.append("campaign", "3"),
    formdata.append("email", ["keshav@gmail.com"])
  return axios({
    method: 'POST',
    url: `${API_BASE_URL}/campaign/recipients/`,

    data: formdata,

    headers: {
      "Authorization": `Bearer ${token}`,
    }

  })
}

Api.GetAllCampaigns = (token) => {
  return axios({
    url: `${API_BASE_URL}/campaign/view/`,
    data: {},
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

export default Api;