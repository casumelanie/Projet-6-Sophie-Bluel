import { postLogin } from './api.js'
import { loginEmail, loginPassword, formLogin } from './domLinker.js'

// Lancement de la fonction connexion au clic sur submit
formLogin.addEventListener('submit', async function (e) {
    e.preventDefault()
    // Récupération de l'user et du mdp renseignés
    const user = {
        email: loginEmail.value,
        password: loginPassword.value
    }

    try {
        // Appel vers l'API
        const data = await postLogin(user)
        // En cas de réussite, stockage du token dans le local Storage + redirection
        if (data.token) {
            const token = data.token
            localStorage.token = token
            console.log(localStorage)
            document.location.href = 'index.html'
        } else {
            alert('Erreur dans l\'identifiant ou le mot de passe')
        }
    } catch (error) {
        alert('API non disponible : ' + error.message)
    }
})
