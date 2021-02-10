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
Api.ViewApi = (token) => {
    return axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/campaign/view/',
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })

}
Api.MailSenderApi = (mailData, token) => {
    console.log(mailData.smtpUser,'mailData.smtpUser',mailData.imapUser,":mailData.imapUser", mailData.email," mailData.emailAddress")
    return axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/mail/sender/',
        data: {
            email: mailData.emailAddress,
            full_name: mailData.FullName,
            smtp_port: mailData.smtpPort,
            smtp_host: mailData.smtpHost,
            smtp_password: mailData.smtpPassword,
            smtp_username: mailData.smtpUser,
            imap_port: mailData.imapPort,
            imap_host: mailData.imapHost,
            imap_password: mailData.imapPassword,
            imap_username: mailData.imapUser,
        },
        headers: {
            "Authorization": `Bearer ${token}`,
        }

    })

}

export default Api;