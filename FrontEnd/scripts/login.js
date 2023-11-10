import { postLogin } from './api.js'
import { loginEmail, loginPassword, formLogin } from './domLinker.js'

const connectionFunction = async () => {
    const user = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    postLogin(user)
        .then(data => {
            if (data.token) {
                console.log(data.token)
                // STOCKER TOKEN DANS LE LOCAL STORAGE
                // FAIRE REDIRECTION VERS INDEX.HTML
            } else {
                alert('Erreur dans l\'identifiant ou le mot de passe')
            }
        }).catch(error => alert('API non disponible : ' + error.message))
}

formLogin.addEventListener('submit', function (e) {
    e.preventDefault()
    connectionFunction()
})
