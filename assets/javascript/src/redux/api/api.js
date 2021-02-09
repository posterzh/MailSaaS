import axios from 'axios';

const Api = {}
Api.RegisterApi = (user) => {
    return axios.post(`http://127.0.0.1:8000/rest-auth/registration/`, user)
}
Api.LoginApi = (Loginuser) => {
    return axios.post(`http://127.0.0.1:8000/rest-auth/login/`, Loginuser)
}
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
Api.RecipientApi = (recipientData, token) => {
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/campaign/recipients/',
        data: {
            csvfile_op1: recipientData.csvFile,
            email: `${recipientData.email}`,
            campaign: recipientData.campaign,
            option: `${recipientData.options}`,
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })

}
Api.ViewApi = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/view/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })

}

export default Api;