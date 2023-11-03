/* fetch('http://localhost:5678/api/works')
    .then(r => r.json())
    .then(content => {
        console.log(content)
        console.log(content[0])
    })
 */

const projectGallery = document.querySelector('#portfolio .gallery')

// RECUPERATION DES PROJETS
async function recupererEtAfficherProjets () {
    const reponse = await fetch('http://localhost:5678/api/works')
    const projets = await reponse.json()
    // CREATION ET AJOUT DES CARTES POUR CHAQUE PROJET
    projets.forEach(element => {
        const projectCard = document.createElement('figure')
        const projectImg = document.createElement('img')
        const projectTitle = document.createElement('figcaption')
        projectImg.src = element.imageUrl
        projectImg.alt = element.title
        projectTitle.innerText = element.title
        projectCard.appendChild(projectImg)
        projectCard.appendChild(projectTitle)
        projectGallery.appendChild(projectCard)
    })
}

const filterContainer = document.querySelector('#portfolio .portfolio-filters')
// CREATION DU FILTRE ALL
const filterButtonAll = document.createElement('button')
filterButtonAll.classList.add('filter-button')
filterButtonAll.classList.add('filter-button-all')
filterButtonAll.classList.add('filter-button-inactive')
filterButtonAll.innerText = 'Tous'
filterContainer.appendChild(filterButtonAll)

// RECUPERATION DES CATEGORIES
async function recupererCategories () {
    const reponse = await fetch('http://localhost:5678/api/categories')
    const categories = await reponse.json()
    // CREATION ET AJOUT DES FILTRES POUR CHAQUE CATEGORIE
    categories.forEach(categorie => {
        const filterButton = document.createElement('button')
        filterButton.classList.add('filter-button')
        filterButton.classList.add('filter-button-inactive')
        filterButton.classList.add('filter-button-categorie')
        filterButton.innerText = categorie.name
        filterContainer.appendChild(filterButton)
    })

    // COMPORTEMENT AU CLIC SUR LES BOUTONS DE FILTRE
    // OBLIGÉ DE LE METTRE DANS LA FONCTION SINON IL NE RECUPERE PAS LES NVX BTNS
    const btns = document.querySelectorAll('.filter-button')
    btns.forEach(btn => {
        btn.addEventListener('click', function () {
            console.log('bouton cliqué')
            btn.classList.remove('filter-button-active')
            btn.classList.add('filter-button-active')
        /*             if(){

            }else{

            } */
        })
    })
}

recupererEtAfficherProjets()
recupererCategories()
