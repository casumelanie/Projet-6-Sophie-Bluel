import { getWorks, getCategories /* deleteWork */ } from './api.js'
import { projectGallery, filterContainer, loginButton, editHeader, editButton, modalEdit, triggerModal } from './domLinker.js'

// METHODE DE CREATION DES PROJETS POUR CHAQUE GALERIE
const createGallery = projects => {
    projectGallery.forEach((gallery, index) => {
        // Remise a 0 de la galerie lors du filtrage
        gallery.innerHTML = ''
        // Creation et ajout des cartes projets
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

        // Fenetre modale : ajout corbeille et supression titre projet
        if (index === 1) {
            const modalProjects = document.querySelectorAll('.modal-gallery figure')
            modalProjects.forEach(modalProject => {
                const trashIcon = document.createElement('i')
                trashIcon.classList.add('fa-trash-can', 'fa-solid')
                modalProject.appendChild(trashIcon)
                const projectTitle = document.querySelector('.modal-gallery figcaption')
                modalProject.removeChild(projectTitle)
                // Supression du projet au clic sur la corbeille
                trashIcon.addEventListener('click', function () {
                    // deleteWork(modalProject.)
                    console.log('clic corbeille')
                    console.log(modalProject)
                })
            })
            console.log(modalProjects)
        }
    })
}

// METHODE DE FILTRAGE DES PROJETS
const createCategories = categories => {
    // Creation du filtre All
    const filterButtonAll = document.createElement('button')
    filterButtonAll.classList.add('filter-button')
    filterButtonAll.classList.add('filter-button-all')
    filterButtonAll.innerText = 'Tous'
    filterContainer.appendChild(filterButtonAll)
    filterButtonAll.classList.add('filter-button-active')
    // Comportement au clic sur le filtre All
    filterButtonAll.addEventListener('click', function () {
        const btnsFilter = document.querySelectorAll('.portfolio-filters .filter-button')
        btnsFilter.forEach(btn => {
            btn.classList.remove('filter-button-active') // Suppression de la classe active de tous les btns
        })
        filterButtonAll.classList.add('filter-button-active') // Ajouts de la classe active au btn All

        // Affichage de la galerie au clic sur le filtre All
        getWorks().then(projects => createGallery(projects))
    })

    // CREATION ET AJOUT DES FILTRES POUR CHAQUE CATEGORIE (SAUF ALL)
    categories.forEach(categorie => {
        const filterButton = document.createElement('button')
        filterButton.classList.add('filter-button')
        filterButton.classList.add('filter-button-categorie')
        filterButton.innerText = categorie.name
        filterContainer.appendChild(filterButton)

        // Comportement au clic sur les filtres
        filterButton.addEventListener('click', function () {
            const btnsFilter = document.querySelectorAll('.portfolio-filters .filter-button')
            btnsFilter.forEach(btn => {
                btn.classList.remove('filter-button-active')
            })
            filterButton.classList.add('filter-button-active')

            // Creation de la galerie en fonction du filtre
            getWorks().then(projects => {
                // Récupération des projets filtrés
                const filteredProjects = projects.filter(project => project.categoryId === categorie.id)
                // Création de la galerie en fonction de l'id du projet
                createGallery(filteredProjects)
            })
        })
    })
}

// MISE À JOUR DE L'AFFICHAGE EN FONCTION DE L'ÉTAT DE CONNEXION
if (localStorage.token) {
    loginButton.innerText = 'logout'
    editHeader.classList.remove('hidden')
    editButton.classList.remove('hidden')
    filterContainer.classList.add('hidden')
    loginButton.addEventListener('click', function () {
        // Suppression du token dans le local sto au clic sur logout + maj affichage
        localStorage.clear()
        loginButton.innerText = 'login'
        document.location.href = 'index.html' // Redir pour actualisation
    })
    // Ouverture / fermeture de la modale
    triggerModal.forEach(trigger => trigger.addEventListener('click', function (e) {
        modalEdit.classList.toggle('hidden')
        e.preventDefault()
    })
    )
} else { // Comportement au clic sur login si pas de token dans le local Sto
    loginButton.addEventListener('click', function () {
        document.location.href = 'login.html'
    })
}

// INITIALISATION DE LA GALERIE ET DES PROJETS A L'OUVERTURE DE LA PAGE
const init = async () => {
    getWorks().then(projects => createGallery(projects))
    getCategories().then(categories => createCategories(categories))
}
init()
