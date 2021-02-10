import axios from 'axios';

const Api = {}
Api.RegisterApi = (user) => {
    return axios.post(`http://127.0.0.1:8000/rest-auth/registration/`, user)
}
Api.LoginApi = (loginuser) => {
    return axios.post(`http://127.0.0.1:8000/rest-auth/login/`, loginuser)
}
Api.StartCampaignApi = (data, token) => {
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

 Api.RecipientApi = (formData, token) => {
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/campaign/recipients/',
        data:{formData},
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })

}
Api.CampaignTableDataApi = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/view/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })

}
Api.MailSenderApi = (mailData, token) => {
    console.log(mailData, token,"data")
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/mail/sender/',
        data: mailData,
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })

}
Api.MailGetDataApi = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/mail/sender/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}


export default Api;