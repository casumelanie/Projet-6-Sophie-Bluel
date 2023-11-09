import { URL_LOGIN } from './api.js'

const loginUser = async () => {
    const user = {
        email: 'sophie.bluel@test.tld',
        password: 'S0phie'
    }

    console.log(user)

    try {
        const response = await fetch(URL_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const result = await response.json()
        console.log(result)
    } catch (error) {
        console.error('erreur', error)
    }
}

loginUser()
