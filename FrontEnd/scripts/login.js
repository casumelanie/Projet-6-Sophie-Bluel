import { URL_LOGIN } from './api.js'
import { loginEmail, loginPassword, connexionButton } from './domLinker.js'

const connectionFunction = async () => {
    const user = {
        email: 'sophie.bluel@test.tld', // à remplacer par loginEmail une fois test terminé
        password: 'S0phie' // à remplacer par loginPassword une fois test terminé
    }

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
        const token = result.token
        console.log(token)
    } catch (error) {
        console.error('erreur', error.message)
        alert('Erreur dans l’identifiant ou le mot de passe' + error.message)
    }
}

connexionButton.addEventListener('click', function () {
    connectionFunction()
})

/* si réussi je dois stocker le token :
data.token
et il y a aussi userId
data.userId
*/
