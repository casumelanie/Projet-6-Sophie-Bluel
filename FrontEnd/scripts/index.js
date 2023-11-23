import { getWorks, getCategories } from './api.js'
import { projectGallery, filterContainer, loginButton, editHeader, editButton, modalEdit, triggerModal } from './domLinker.js'

// METHODE DE CREATION DES PROJETS POUR CHAQUE GALERIE
const createGallery = projects => {
    projectGallery.forEach(gallery => {
        // REMISE A 0 DE LA GALERIE POUR LE FILTRAGE
        gallery.innerHTML = ''
        // CREATION ET AJOUT DES CARTES
        projects.forEach(project => {
            const projectCard = document.createElement('figure')
            const projectImg = document.createElement('img')
            const projectTitle = document.createElement('figcaption')
            projectImg.src = project.imageUrl
            projectImg.alt = project.title
            projectTitle.innerText = project.title
            projectCard.appendChild(projectImg)
            projectCard.appendChild(projectTitle)
            gallery.appendChild(projectCard)
        })
    })
}

// METHODE BOUTONS DE FILTRAGE
const createCategories = categories => {
    // CREATION DU FILTRE ALL
    const filterButtonAll = document.createElement('button')
    filterButtonAll.classList.add('filter-button')
    filterButtonAll.classList.add('filter-button-all')
    filterButtonAll.innerText = 'Tous'
    filterContainer.appendChild(filterButtonAll)
    filterButtonAll.classList.add('filter-button-active')
    // COMPORTEMENT AU CLIC SUR LE BOUTON ALL
    filterButtonAll.addEventListener('click', function () {
        const btnsFilter = document.querySelectorAll('.portfolio-filters .filter-button')
        btnsFilter.forEach(btn => {
            btn.classList.remove('filter-button-active') // SUPPRESSION DE LA CLASSE ACTIVE DE TOUS LES BTNS
        })
        filterButtonAll.classList.add('filter-button-active') // AJOUT DE LA CLASSE ACTIVE AU BTN ALL

        // REMISE A 0 DE LA GALERIE RE CREATION COMPLETE
        getWorks().then(projects => createGallery(projects))
    })

    // CREATION ET AJOUT DES FILTRES POUR CHAQUE CATEGORIE (SAUF ALL)
    categories.forEach(categorie => {
        const filterButton = document.createElement('button')
        filterButton.classList.add('filter-button')
        filterButton.classList.add('filter-button-categorie')
        filterButton.innerText = categorie.name
        filterContainer.appendChild(filterButton)

        // COMPORTEMENT AU CLIC SUR LES BOUTONS DE FILTRE CATEGORIE
        filterButton.addEventListener('click', function () {
            const btnsFilter = document.querySelectorAll('.portfolio-filters .filter-button')
            btnsFilter.forEach(btn => {
                btn.classList.remove('filter-button-active')
            })
            filterButton.classList.add('filter-button-active')

            // EXECUTION D'UN NOUVEL APPEL A L'API POUR CREER LES PROJETS CORRESPONDANT AU FILTRE
            getWorks().then(projects => {
                // RÉCUPÉRATION DES PROJETS FILTRÉS DANS FILTEREDPROJECTS
                const filteredProjects = projects.filter(project => project.categoryId === categorie.id)
                // CRÉATION DE LA GALERIE EN FONCTION DE L'ID DU PROJET
                createGallery(filteredProjects)
            })
        })
    })
}

// INITIALISATION DE LA GALLERIE ET DES PROJETS A L'OUVERTURE DE LA PAGE
const init = async () => {
    getWorks().then(projects => createGallery(projects))
    getCategories().then(categories => createCategories(categories))
}
init()

// MISE À JOUR DE L'AFFICHAGE EN FONCTION DE L'ÉTAT DE CONNEXION
if (localStorage.token) {
    loginButton.innerText = 'logout'
    editHeader.classList.remove('hidden')
    editButton.classList.remove('hidden')
    filterContainer.classList.add('hidden')
    loginButton.addEventListener('click', function () {
        // SUPPRESSION DU TOKEN DANS LE LOCAL STORAGE AU CLIC SUR LOGOUT ET MAJ AFFICHAGE
        localStorage.clear()
        loginButton.innerText = 'login'
        document.location.href = 'index.html' // REDIRECTION POUR ACTUALISATION
    })
    // OUVERTURE / FERMETURE DE LA MODALE AU CLIC
    triggerModal.forEach(trigger => trigger.addEventListener('click', function () {
        modalEdit.classList.toggle('hidden')
    })
    )
} else {
    loginButton.addEventListener('click', function () {
        document.location.href = 'login.html'
    })
}
