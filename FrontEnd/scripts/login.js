import { postLogin } from './api.js'
import { loginEmail, loginPassword, formLogin } from './domLinker.js'
localStorage.clear()

// Fonction de connexion
const connectionFunction = async () => {
    const user = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    // Methode post connexion
    postLogin(user)
        .then(data => {
            if (data.token) {
                // Stockage du token dans le local storage
                const token = data.token
                localStorage.token = token
                console.log(localStorage)
                // Redirection vers la page d'accueil
                document.location.href = 'index.html'
            } else {
                alert('Erreur dans l\'identifiant ou le mot de passe')
            }
        }).catch(error => alert('API non disponible : ' + error.message))
}

// Lancement de la fonction connexion au clic sur le bouton de connexion
formLogin.addEventListener('submit', function (e) {
    e.preventDefault()
    connectionFunction()
})
