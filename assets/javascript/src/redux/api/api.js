import axios from 'axios';
import { API_BASE_URL } from '../../Constants'
const Api = {}

Api.RegisterApi = (user) => {
  return axios.post(`${API_BASE_URL}/rest-auth/registration/`, user)
}
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
  return axios({
    method: 'POST',
    url: `${API_BASE_URL}/mail/sender/`,
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
    headers: {
      "Authorization": `Bearer ${token}`,
    }
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


export default Api;