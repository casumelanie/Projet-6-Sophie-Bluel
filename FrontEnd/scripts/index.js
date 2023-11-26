import { getWorks, getCategories, deleteWork, addWork } from './api.js'
import { projectGallery, filterContainer, loginButton, editHeader, editButton, modalEdit, triggerModal, addProjectButton, firstModal, secondModal, returnBack, formNewProject, inputImgNewProject, imgNewProject, titleNewProject, categoriesNewProject, inputFileContent, pushProjectButton } from './domLinker.js'

// METHODE DE CREATION DES PROJETS POUR CHAQUE GALERIE
const createGallery = projects => {
    projectGallery.forEach((gallery, index) => {
        // Remise a 0 de la galerie lors du filtrage
        gallery.innerHTML = ''
        // Creation et ajout des cartes projets
        projects.forEach(project => {
            const projectCard = document.createElement('figure')
            const projectImg = document.createElement('img')
            projectImg.src = project.imageUrl
            projectImg.alt = project.title
            projectCard.appendChild(projectImg)

            // homepage : Création du titre du projet
            if (index === 0) {
                const projectTitle = document.createElement('figcaption')
                projectTitle.innerText = project.title
                projectCard.appendChild(projectTitle)
            }

            // Fenetre modale : ajout corbeille et supression titre projet
            if (index === 1) {
                const trashIcon = document.createElement('i')
                trashIcon.classList.add('fa-trash-can', 'fa-solid')
                projectCard.appendChild(trashIcon)

                // Supression du projet au clic sur la corbeille
                trashIcon.addEventListener('click', function () {
                    deleteWork(project.id)
                        .then(() => getWorks())
                        .then(updatedProjects => createGallery(updatedProjects))
                })
            }
            gallery.appendChild(projectCard)
        })
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
    }))
    // Changement de modale pour ajouter un projet
    addProjectButton.addEventListener('click', function (e) {
        e.preventDefault()
        firstModal.classList.add('hidden')
        secondModal.classList.remove('hidden')
    })
    // Retour vers la modale 1 au clic sur la flèche
    returnBack.addEventListener('click', function () {
        firstModal.classList.remove('hidden')
        secondModal.classList.add('hidden')
    })
    // Ajout des catégories dans la modale d'ajout photo
    getCategories().then(categories => {
        categories.forEach(function (element, id) {
            categoriesNewProject[id] = new Option(element.name, element.id)
        })
    })
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

// AJOUT IMAGE NOUVEAU PROJET
inputImgNewProject.onchange = e => {
    const file = e.target.files[0]
    // Règles ajout de l'image
    if (file.size > 4194304) {
        alert('Le fichier est trop volumineux')
    } else if (file.type !== 'image/png' && file.type !== 'image/jpg') {
        alert('Le fichier n\'est pas au format .png ou .jpg')
    } else {
        // Apercu de l'image
        imgNewProject.src = URL.createObjectURL(e.target.files[0])
        inputFileContent.forEach(content => {
            content.classList.add('hidden')
        })
    }
}

// REGLE AJOUT TITRE NOUVEAU PROJET
const regex = new RegExp('^[a-zA-Z"\\s-]+$')
titleNewProject.onchange = e => {
    if (!regex.test(titleNewProject.value)) {
        alert('Veuillez donner un titre valide au projet : vous pouvez seulement utiliser des lettres, des " et des -')
    }
}

// BOUTON VALIDER MODALE 2
formNewProject.onchange = e => {
    if (regex.test(titleNewProject.value) && inputImgNewProject.files.length > 0) {
        console.log('le formulaire peut etre envoyé')
        pushProjectButton.classList.add('add-project-button-valid')
    }
}

// ENVOI D'UN NOUVEAU PROJET A L'API ET CREATION DU PROJET EN FRONT
formNewProject.addEventListener('submit', (e) => {
    e.preventDefault()
    const newProject = new FormData()
    newProject.append('title', titleNewProject.value)
    newProject.append('image', inputImgNewProject.files[0])
    newProject.append('category', categoriesNewProject.value)

    addWork(newProject)
        .then(() => {
            location.reload()
        })
})
