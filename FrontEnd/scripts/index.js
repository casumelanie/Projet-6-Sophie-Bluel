async function recupererEtCreerProjets () {
    const reponse = await fetch('http://localhost:5678/api/works')
    const projets = await reponse.json()
    projets.forEach(element => {
        /* console.log(element) */
        const projectGallery = document.querySelector('#portfolio .gallery')
        const projectCard = document.createElement('figure')
        const projectImg = document.createElement('img')
        projectImg.src = element.imageUrl
        projectImg.alt = element.title
        const projectTitle = document.createElement('figcaption')
        projectTitle.innerText = element.title
        projectCard.appendChild(projectImg)
        projectCard.appendChild(projectTitle)
        projectGallery.appendChild(projectCard)
    })
}
recupererEtCreerProjets()
