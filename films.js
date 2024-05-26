document.addEventListener('DOMContentLoaded', (event) => {
    loadFilms();
    loadLists();
    // ajouterDuration()

    document.getElementById('searchModal').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const filmName = document.getElementById('search-input').value.trim().toLowerCase();
            const films = JSON.parse(localStorage.getItem('films')) || [];

            if (films.length === 0) {
                alert("Aucun film trouvé.");
                return;
            }

            let bestMatch = null;
            let bestMatchSimilarity = 0;

            films.forEach(film => {
                const similarity = calculateSimilarity(film.name.toLowerCase(), filmName);
                if (similarity > bestMatchSimilarity) {
                    bestMatch = film;
                    bestMatchSimilarity = similarity;
                }
            });

            closeSearchModal();

            if (bestMatch) {
                openInfoModal(bestMatch);
            } else {
                alert("Aucun film trouvé.");
            }
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const searchModal = document.getElementById('searchModal');
            const editModal = document.getElementById('editModal');
            const directorModal = document.getElementById('directorModal');
            const actorModal = document.getElementById('actorModal');
            const musicianModal = document.getElementById('musicianModal');
            const yearModal = document.getElementById('yearModal');
            const infoModal = document.getElementById('infoModal');
            const addThemeModal = document.getElementById('addThemeModal');
            const themeModal = document.getElementById('themeModal');
            const themeInfoModal = document.getElementById('themeInfoModal');
            const editThemeInfoModal = document.getElementById('editThemeInfoModal');
            const typeModal = document.getElementById('typeModal');
            const countryModal = document.getElementById('countryModal');
            const cinematographerModal = document.getElementById('cinematographerModal');
            const editorModal = document.getElementById('editorModal'); // Nouvelle ligne ajoutée pour le modal d'éditeur

            if (searchModal.style.display === 'flex') {
                closeSearchModal();
            } else if (editModal.style.display === 'flex') {
                closeEditModal();
            } else if (directorModal.style.display === 'flex') {
                closeDirectorModal();
            } else if (actorModal.style.display === 'flex') {
                closeActorModal();
            } else if (musicianModal.style.display === 'flex') {
                closeMusicianModal();
            } else if (yearModal.style.display === 'flex') {
                closeYearModal();
            } else if (addThemeModal.style.display === 'flex') {
                closeAddThemeModal();
            } else if (themeModal.style.display === 'flex') {
                closeThemeModal();
            } else if (editThemeInfoModal.style.display === 'flex') {
                closeEditThemeInfoModal();
            } else if (typeModal.style.display === 'flex') {
                closeTypeModal();
            } else if (countryModal.style.display === 'flex') {
                closeCountryModal();
            } else if (cinematographerModal.style.display === 'flex') {
                closeCinematographerModal();
            } else if (editorModal.style.display === 'flex') { // Nouvelle condition pour le modal d'éditeur
                closeEditorModal(); // Fonction à implémenter pour fermer le modal d'éditeur
            } else if (themeInfoModal.style.display === 'flex') {
                closeThemeInfoModal();
            } else if (infoModal.style.display === 'flex') {
                closeInfoModal();
            } 
        }
    });

    document.getElementById('editModal').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            saveEdit();
        }
    });
});

function loadFilms() {
    const filmList = document.getElementById('film-list');
    const films = JSON.parse(localStorage.getItem('films')) || [];

    films.sort((a, b) => a.year - b.year);
    filmList.innerHTML = '';
    
    films.forEach(film => {
        const newFilm = createFilmElement(film);
        filmList.appendChild(newFilm);
    });
}

function addFilm() {
    const filmInput = document.getElementById('film-input');
    const directorInput = document.getElementById('director-input');
    const yearInput = document.getElementById('year-input');
    const errorMessage = document.getElementById('error-message');

    const newFilmName = filmInput.value.trim();
    const newDirector = directorInput.value.trim();
    const newYear = yearInput.value.trim();

    if (newFilmName === "" || newDirector === "" || newYear === "") {
        showError("Veuillez remplir tous les champs");
        return;
    }

    if (!/^\d{4}$/.test(newYear)) {
        showError("L'année doit contenir 4 chiffres");
        return;
    }

    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmExists = films.some(film => film.name.toLowerCase() === newFilmName.toLowerCase());

    if (filmExists) {
        showError("Ce film existe déjà");
    } else {
        saveFilm( { name: newFilmName,
            director: newDirector,
            year: newYear,
            themes: [],
            duration: '',
            actors: [],
            cinematographers: [],
            editors: [],
            writters: [],
            types: [],
            countries: [],
            quotes: [],
            musicians: [],
            music: '',
            prices: [],
            info: '',
            rate: 0, 
            status: [], 
            sites: [], 
            poster: [], 
            video: []});
        loadFilms();
        loadLists();
        filmInput.value = "";
        directorInput.value = "";
        yearInput.value = "";
        const films = JSON.parse(localStorage.getItem('films')) || [];
        const film = films.find(film => film.name === newFilmName);
        openInfoModal(film);
        clearError();
    }
}

function saveFilm(film) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    films.push(film);
    localStorage.setItem('films', JSON.stringify(films));
}

function updateFilm(updatedFilm) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const index = films.findIndex(film => film.name === updatedFilm.oldName);
    if (index !== -1) {
        films[index] = { name: updatedFilm.name, director: updatedFilm.director, year: updatedFilm.year };
        localStorage.setItem('films', JSON.stringify(films));
        loadFilms();
    }
}

function deleteAllFilms() {
    if (confirm("Voulez-vous vraiment supprimer tous les films ?")) {
        localStorage.removeItem('films');
        document.getElementById('film-list').innerHTML = '';
        loadLists();
        clearError();
    }
}

function deleteFilm() {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce film ?")) {
        const filmName = document.getElementById('infoModal-film-name').textContent.trim();
        const films = JSON.parse(localStorage.getItem('films')) || [];
        const updatedFilms = films.filter(film => film.name.toLowerCase() !== filmName.toLowerCase());
        localStorage.setItem('films', JSON.stringify(updatedFilms));
        closeInfoModal();
        loadLists();
        loadFilms();
        window.location.reload();
    }    
}

function deleteFilm2(film) {
    if (confirm("Voulez-vous supprimer ce film ?")) {
        const filmName = film.name
        const films = JSON.parse(localStorage.getItem('films')) || [];
        const updatedFilms = films.filter(film => film.name !== filmName);
        localStorage.setItem('films', JSON.stringify(updatedFilms));
        closeInfoModal();
        loadLists();
        loadFilms();
        window.location.reload();
    }    
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}

function clearError() {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';
}

function createFilmElement(film) {
    const newFilm = document.createElement('div');
    newFilm.classList.add('film-item'); // Ajouter une classe pour styliser chaque élément de la mosaïque

    const filmText = document.createElement('span-film');
    filmText.textContent = film.name;

    newFilm.addEventListener('click', function() {
        openInfoModal(film);
    });

    // Bouton suppression du film
    // const deleteButton = document.createElement('button');
    // deleteButton.innerHTML = '🗑️';
    // deleteButton.classList.add('delete-film-btn');
    // deleteButton.addEventListener('click', function(event) {
    //     event.stopPropagation();
    //     deleteFilm2(film);
    // });

    // Boutton palme d'or
    // const goldenPalmButton = document.createElement('button');
    // goldenPalmButton.className = 'award-button';
    // const goldenPalmImg = document.createElement('img');
    // goldenPalmImg.src = 'C:/Users/matth/Documents/Cinéma/Test/3/Pictures/Palme_d_or.png';
    // goldenPalmImg.alt = 'Icon';
    // goldenPalmButton.appendChild(goldenPalmImg);

    // Boutton Oscar
    // const oscarButton = document.createElement('button');
    // oscarButton.className = 'award-button';
    // const oscarImg = document.createElement('img');
    // oscarImg.src = 'C:/Users/matth/Documents/Cinéma/Test/3/Pictures/Oscar.png';
    // oscarImg.alt = 'Icon';
    // oscarButton.appendChild(oscarImg);

    newFilm.appendChild(filmText);
    buttonBox = document.createElement('div');
    buttonBox.classList.add("button-box");
    // buttonBox.appendChild(goldenPalmButton);
    // buttonBox.appendChild(oscarButton);
    // buttonBox.appendChild(deleteButton);
    newFilm.appendChild(buttonBox);
    return newFilm;
}

function editFilm() {
    const editModalFilmName = document.getElementById('infoModal-film-name').textContent.trim();
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === editModalFilmName.toLowerCase());
    if (film) {
        openEditModal(film);
    }
}
    
function saveEdit() {
    const editModal = document.getElementById('editModal');
    const editModalFilmName = document.getElementById('editModal-film-name').textContent;
    const editModalFilmDirector = document.getElementById('editModal-film-director-input').value;
    const editModalFilmYear = document.getElementById('editModal-film-year-input').value;
    const editModalFilmDuration = document.getElementById('editModal-film-duration-input').value;

    if (!/^\d{4}$/.test(editModalFilmYear)) {
        alert("L'année doit contenir 4 chiffres");
        return;
    }

    // Vérifiez si la longueur du film est au format "h'h'mm"
    const durationRegex = /^\d+h\d{2}$/;
    if (editModalFilmDuration !== '' && !durationRegex.test(editModalFilmDuration)) {
        alert("Le format de la durée du film n'est pas correct. Veuillez utiliser le format h'h'mm (ex: 1h20).");
        return; // Arrêtez l'exécution de la fonction si le format n'est pas correct
    }

    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name === editModalFilmName);
    if (filmIndex !== -1) {
        films[filmIndex].director = editModalFilmDirector;
        films[filmIndex].year = editModalFilmYear;
        films[filmIndex].duration = editModalFilmDuration;
        localStorage.setItem('films', JSON.stringify(films));
        loadLists();
        closeEditModal();
    } else {
        alert('Film non trouvé');
    }
}

function addTheme() {
    const themeNameInput = document.getElementById('theme-name-input').value.trim();
    const themeInfoInput = document.getElementById('theme-info-input').value.trim();

    if (themeNameInput !== '') {
        const filmName = document.getElementById('infoModal-film-name').textContent.trim();
        const films = JSON.parse(localStorage.getItem('films')) || [];
        const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());
        
        if (filmIndex !== -1) {
            // Vérifier si le thème existe déjà pour ce film
            if (!films[filmIndex].themes) {
                films[filmIndex].themes = []; // Initialiser le tableau des thèmes si nécessaire
            }
            
            const themeExists = films[filmIndex].themes.some(theme => theme.name === themeNameInput);
            if (!themeExists) {
                // Ajouter le thème uniquement s'il n'existe pas déjà
                films[filmIndex].themes.push({ name: themeNameInput, info: themeInfoInput });
                localStorage.setItem('films', JSON.stringify(films));
                loadLists();
                closeAddThemeModal();
                openInfoModal(films[filmIndex]); // Mettre à jour le modal d'information pour afficher les thèmes mis à jour
            } else {
                alert('Ce thème existe déjà pour ce film.');
            }
        } else {
            alert('Film non trouvé');
        }
    } else {
        alert('Le nom du thème ne peut pas être vide.');
    }
}

function editTheme() {
    const themeInfoModalTitle = document.getElementById('themeInfoModal-title');

    // Extraire le nom du thème entre guillemets
    let themeNameRegex = /"([^"]+)"/;
    let themeNameMatch = themeNameRegex.exec(themeInfoModalTitle.innerHTML);
    let themeName = themeNameMatch ? themeNameMatch[1] : '';

    // Extraire le nom du film entre les balises <em>
    let filmNameRegex = /<em>([^<]+)<\/em>/;
    let filmNameMatch = filmNameRegex.exec(themeInfoModalTitle.innerHTML);
    let filmName = filmNameMatch ? filmNameMatch[1] : '';

    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name === filmName);
    const theme = film.themes.find(theme => theme.name === themeName);

    showEditThemeInfoModal(film, theme);
}

function saveEditTheme() {
    // Récupérer le contenu modifié de l'info du thème
    const updatedInfo = document.getElementById('editThemeInfoModal-info').value;
    
    // Extraire le nom du thème entre guillemets
    let themeNameRegex = /"([^"]+)"/;
    let themeNameMatch = themeNameRegex.exec(document.getElementById('editThemeInfoModal-title').innerHTML);
    let themeName = themeNameMatch ? themeNameMatch[1] : '';

    // Extraire le nom du film entre les balises <em>
    let filmNameRegex = /<em>([^<]+)<\/em>/;
    let filmNameMatch = filmNameRegex.exec(document.getElementById('editThemeInfoModal-title').innerHTML);
    let filmName = filmNameMatch ? filmNameMatch[1] : '';

    // Récupérer les films depuis le stockage local
    const films = JSON.parse(localStorage.getItem('films')) || [];

    // Trouver le film correspondant dans la liste des films
    const film = films.find(film => film.name === filmName);

    // Trouver le thème correspondant dans la liste des thèmes du film
    const themeIndex = film.themes.findIndex(theme => theme.name === themeName);

    // Mettre à jour les informations du thème si le thème est trouvé
    if (themeIndex !== -1) {
        film.themes[themeIndex].info = updatedInfo;
        localStorage.setItem('films', JSON.stringify(films));
        closeEditThemeInfoModal(); // Fermer la modale d'édition du thème après l'enregistrement
        showThemeInfoModal(film, film.themes[themeIndex]); // Actualiser le modal d'information du thème avec les nouvelles informations
        loadLists();
    } else {
        console.log(`Thème "${themeName}" introuvable pour le film "${filmName}".`);
    }
}

function calculateSimilarity(str1, str2) {
    const maxDuration = Math.max(str1.length, str2.length);
    let matchingChars = 0;
    
    for (let i = 0; i < maxDuration; i++) {
        if (str1[i] && str2[i] && str1[i] === str2[i]) {
            matchingChars++;
        }
    }
    
    return matchingChars / maxDuration;
}

function removeThemeFromFilm(film, theme) {
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer le thème "${theme.name}" du film "${film.name}" ?`);
    if (confirmation) {
        const themeIndex = film.themes.findIndex(t => t.name === theme.name);
        if (themeIndex !== -1) {
            film.themes.splice(themeIndex, 1);
            const films = JSON.parse(localStorage.getItem('films')) || [];
            const index = films.findIndex(f => f.name === film.name);
            if (index !== -1) {
                films[index] = film;
                localStorage.setItem('films', JSON.stringify(films));
            }            
        }
    }
    openInfoModal(film);
    loadLists();
}

function search() {
    const filmName = document.getElementById('search-film-input').value.trim().toLowerCase();
    const films = JSON.parse(localStorage.getItem('films')) || [];

    if (films.length === 0) {
        alert("Aucun film trouvé.");
        return;
    }

    let bestMatch = null;
    let bestMatchSimilarity = 0;

    films.forEach(film => {
        const similarity = calculateSimilarity(film.name.toLowerCase(), filmName);
        if (similarity > bestMatchSimilarity) {
            bestMatch = film;
            bestMatchSimilarity = similarity;
        }
    });

    closeSearchModal();

    if (bestMatch) {
        openInfoModal(bestMatch);
    } else {
        alert("Aucun film trouvé.");
    }
}