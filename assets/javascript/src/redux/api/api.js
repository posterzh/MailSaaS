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
  formData.append('csvfile_op1', recipientData.csvfile_op1);
  formData.append('email', recipientData.email);
  formData.append('option', recipientData.option);
  formData.append('campaign', recipientData.campaign)
  console.log('rec api', formData);
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
    data: data,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign GET preview
Api.CampaignPreviewApi = (token, id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/personalize/${id}/`,
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

// campaign_savecampaign (put)
Api.CampaignSaveApi = (token, id, saveData) => {
  return axios({
    method: 'PUT',
    data: {
      startCampaign: saveData
    },
    url: `${API_BASE_URL}/campaign/savecamp/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign leadcatcher
Api.CampaignLeadCatcherApi = (token, id, leadData) => {
  return axios({
    method: "POST",
    url: `${API_BASE_URL}/campaign/settings-leadcatcher/`,
    data: {
      campaign: id,
      of_times: leadData.of_times,
      leadcatcher_recipient: leadData.leadcatcher_recipient,
      specific_link: leadData.specific_link
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    } 
  })
  
}

// LEAD CATCHER GET DATA
Api.CampaignLeadGetApi = (token, id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/settings-leadcatcherView/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// LEAD CATCHER DELETE DATA
Api.CampaignLeadDeleteApi = (token, id) => {
  return axios({
    method: 'DELETE',
    url: `${API_BASE_URL}/campaign/settings-leadcatcher/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// CampaignLeadUpadteApi
Api.CampaignLeadUpadteApi = (token,getId ,id,updateLeadData) => {
  console.log("getId",getId,id)
  return axios({
    method: 'PUT',
    data:{
      campaign: id,
      of_times: updateLeadData.of_times,
      leadcatcher_recipient: updateLeadData.leadcatcher_recipient,
      specific_link: updateLeadData.specific_link
    },
    url: `${API_BASE_URL}/campaign/settings-leadcatcher/${getId}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
// http://127.0.0.1:8000/campaign/settings-leadcatcher/31/

// view all leads
Api.CampaignLeadViewApi = (token, id,leadViewData) => {
  return axios({
    method: 'GET',
    data:leadViewData,
    url: `${API_BASE_URL}/campaign/leadscatcher/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// /campaign/leadscatcher/214/
// campaign get-overview
Api.CampaignOverviewApi = (token, id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/overview/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
// campaign recipient people (get)
Api.CampaignRecipientPeopleApi = (token, id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/recipients/people/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign recipient peoples (put)
Api.CampaignRecipienPutPeople = (token) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/campaign/recipients/people/1/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// campaign recipient (put) (api for update recipient details)   
// its not working
Api.CampaignCreateLeadApi = (token,id,createLeadData) => {
  return axios({
    method: 'PUT',
    url: `${API_BASE_URL}/campaign/recipients/${id}/`,
    data: {
      createLeadData
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


Api.deleteProspects = (id,token) => {
  console.log('aaaaaaaaaaaaaaaaaaaaaaaa',id)
  return axios({
    method: 'DELETE',
    url: `${API_BASE_URL}/campaign/prospects/${id}/`,
    id: {    
            id: id,
            
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}





// ONCLICK PRSPECT
Api.CampaignOnclickProspects = (id, token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/prospects/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
// ProspectsUnsubscribe
Api.ProspectsUnsubscribe=(id,token)=>{
  return axios({
    method:'put',
     url: `${API_BASE_URL}/campaign/recipientunsubcribe/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    data:{
      recipient_id:id
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
// Api.MailSenderDelete = (token) => {
//   return axios({
//     method: 'DELETE',
//     url: `${API_BASE_URL}/mail/sender/1/`,
//     headers: {
//       "Authorization": `Bearer ${token}`,
//     }

//   })
// }

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
    data: {},
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`
    },
    data: data
  })
}
Api.fetchUnsbcribed = (token) => {
  console.log("hii 2")
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/unsubscribes/unsubcribeview/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
Api.deleteUnsbcribed = (data, token) => {
  return axios({
    method: 'put',
    url: `${API_BASE_URL}/unsubscribes/unsubcribedelete/`,
    data: {
      data: data
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

Api.unsubscribeUsersWithEmailApi = (email, token) => {
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/unsubscribes/`,
    data: {
      email: [email]
    },
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}
Api.unsubscribeRecipientApi = (id, token) => {
  return axios({
    method:'put',
     url: `${API_BASE_URL}/campaign/recipientunsubcribe/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    data: {
      recipient_id: id
    }
  })
}
Api.unsubscribeUsersWithCsvApi = (file, token) => {
  console.log(file, "fsfsdfdsfgdsfgsdfg")
  return axios({
    method: 'post',
    url: `${API_BASE_URL}/unsubscribes/unsubcribecsv/`,
    data: file,
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
Api.CampaignCreateGetApi = (token, id) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaign/savecamp/${id}/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

// GET SCHEDULE API
Api.GetScheduleApi = (token) => {
  return axios({
    method: 'GET',
    url: `${API_BASE_URL}/campaignschedule/updateschedulemail/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

//UPDATE SCHEDULE
Api.UpdateScheduleApi = (token, scheduledataa) => {
  return axios({
    method: 'PUT',
    data: { ...scheduledataa },
    url: `${API_BASE_URL}/campaignschedule/updateschedulemail/`,
    headers: {
      "Authorization": `Bearer ${token}`,
    }
  })
}

export default Api;