import { getWorks, getCategories } from './api.js'
import { projectGallery, filterContainer } from './domLinker.js'

// METHODE DE CREATIONS DES PROJETS
const createGallery = projects => {
    // REMISE A 0 DE LA GALERIE POUR LE FILTRAGE
    projectGallery.innerHTML = ''
    // CREATION ET AJOUT DES CARTES POUR CHAQUE PROJET
    projects.forEach(project => {
        const projectCard = document.createElement('figure')
        const projectImg = document.createElement('img')
        const projectTitle = document.createElement('figcaption')
        projectImg.src = project.imageUrl
        projectImg.alt = project.title
        projectTitle.innerText = project.title
        projectCard.appendChild(projectImg)
        projectCard.appendChild(projectTitle)
        projectGallery.appendChild(projectCard)
    })
    console.log(projects)
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
            btn.classList.remove('filter-button-active') // J'ENLEVE LA CLASSE ACTIVE DE TOUS LES BTNS
        })
        filterButtonAll.classList.add('filter-button-active') // J'AJOUTE LA CLASSE ACTIVE AU BTN ALL

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

            // J'EXECUTE UN NOUVEL APPEL A L'API POUR CREER LES PROJETS CORRESPONDANT AU FILTRE
            getWorks().then(projects => {
                // JE RECUPERE LES PROJETS FILTRÉS DANS FILTEREDPROJECTS
                const filteredProjects = projects.filter(project => project.categoryId === categorie.id)
                // JE CREER LA GALERIE EN FONCTION DE L'ID DU PROJET
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
