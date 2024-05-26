function openInfoModal(film) {
    const infoModal = document.getElementById('infoModal');
    const infoModalFilmName = document.getElementById('infoModal-film-name');
    const infoModalFilmDirector = document.getElementById('infoModal-film-director');
    const infoModalFilmYear = document.getElementById('infoModal-film-year');
    const infoModalFilmActors = document.getElementById('infoModal-film-actors');
    const infoModalFilmMusicians = document.getElementById('infoModal-film-musicians');
    const infoModalFilmCinematographers = document.getElementById('infoModal-film-cinematographers');
    const infoModalFilmEditors = document.getElementById('infoModal-film-editors');
    const infoModalFilmThemes = document.getElementById('infoModal-film-themes-list');

    // Clear previous content
    infoModalFilmThemes.innerHTML = '';
    infoModalFilmName.textContent = film.name.toUpperCase();
    infoModalFilmDirector.innerHTML = "Réalisation: <span class='director'>" + film.director + "</span>";
    infoModalFilmYear.innerHTML = "Année: <span class='year'>" + film.year + "</span>";

    // Ouvre l'onglet video
    openVideo(film.name);

    updateDurationTypeCountryList(film);

    // Update lists
    if (film.cinematographers.length > 0) {
        updateCinematographersList(infoModalFilmName.textContent, showFilmsByCinematographer, infoModalFilmCinematographers);
    } else {
        infoModalFilmCinematographers.innerHTML = '';
    }
    if (film.actors.length > 0) {
        updateActorsList(infoModalFilmName.textContent, showFilmsByActor, infoModalFilmActors);
    } else {
        infoModalFilmActors.innerHTML = '';
    }
    if (film.musicians.length > 0) {
        updateMusiciansList(infoModalFilmName.textContent, showFilmsByMusician, infoModalFilmMusicians);
    } else {
        infoModalFilmMusicians.innerHTML = '';
    }
    if (film.editors.length > 0) {
        updateEditorsList(infoModalFilmName.textContent, showFilmsByEditor, infoModalFilmEditors);
    } else {
        infoModalFilmEditors.innerHTML = '';
    }

    // Update themes
    if (film.themes && film.themes.length > 0) {
        film.themes.sort((a, b) => a.name.localeCompare(b.name));
        film.themes.forEach(theme => {
            const themeElement = document.createElement('div');
            themeElement.classList.add('infoModal-theme-item');

            const themeName = document.createElement('span');
            themeName.innerHTML = `${theme.name}`;
            themeElement.appendChild(themeName);
            themeElement.addEventListener('click', function() {
                showThemeInfoModal(film, theme);
            });

            const moreThemeButton = document.createElement('button');
            moreThemeButton.textContent = '🔍';
            moreThemeButton.classList.add('more-theme-btn');
            moreThemeButton.addEventListener('click', function(event) {
                event.stopPropagation();
                showTheme(theme);
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '🗑️';
            deleteButton.classList.add('delete-theme-btn');
            deleteButton.addEventListener('click', function(event) {
                event.stopPropagation();
                closeInfoModal();
                removeThemeFromFilm(film, theme);
            });

            const themeButtons = document.createElement('div');
            themeButtons.classList.add('button-box');
            themeButtons.appendChild(moreThemeButton);
            themeButtons.appendChild(deleteButton);
            themeElement.appendChild(themeButtons);
            infoModalFilmThemes.appendChild(themeElement);
        });
    } else {
        const noThemesElement = document.createElement('li');
        noThemesElement.textContent = "Aucun thème";
        infoModalFilmThemes.appendChild(noThemesElement);
    }

    // Add click event listeners for director and year
    const directorContainer = infoModalFilmDirector.querySelector('span');
    const yearContainer = infoModalFilmYear.querySelector('span');
    
    directorContainer.addEventListener('click', function() {
        showFilmsByDirector(film.director);
    });
    yearContainer.addEventListener('click', function() {
        showFilmsByYear(film.year);
    });

    // Rate Container
    setRateButton();

    // Show the modal
    infoModal.style.display = "flex";
}

function closeInfoModal() {
    const infoModal = document.getElementById('infoModal');
    infoModal.style.display = "none";

    const videoPlayer = document.getElementById('infoModal-videoPlayer');
    videoPlayer.pause();
    loadFilms();
}

function openSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.style.display = 'flex';
    document.getElementById('search-film-input').value = '';
}

function closeSearchModal() {
    const searchModal = document.getElementById('searchModal');
    searchModal.style.display = 'none';
}

function openEditModal(film) {
    // Mettre sur pause la vidéo
    const videoPlayer = document.getElementById('infoModal-videoPlayer');
    videoPlayer.pause();

    const editModal = document.getElementById('editModal');
    const editModalFilmName = document.getElementById('editModal-film-name');
    const editModalFilmActors = document.getElementById('editModal-film-actors');
    const editModalFilmCinematographers = document.getElementById('editModal-film-cinematographers');
    const editModalFilmEditors = document.getElementById('editModal-film-editors');
    const editModalFilmTypes = document.getElementById('editModal-film-types');
    const editModalFilmCountries = document.getElementById('editModal-film-countries');
    const editModalFilmMusicians = document.getElementById('editModal-film-musicians');
    const editModalFilmDirectorInput = document.getElementById('editModal-film-director-input');
    const editModalFilmYearInput = document.getElementById('editModal-film-year-input');
    const editModalFilmDurationInput = document.getElementById('editModal-film-duration-input');
    const editModalFilmCinematographersInput = document.getElementById('editModal-film-cinematographers-input');
    const editModalFilmEditorsInput = document.getElementById('editModal-film-editors-input');
    const editModalFilmActorsInput = document.getElementById('editModal-film-actors-input');
    const editModalFilmTypesInput = document.getElementById('editModal-film-types-input');
    const editModalFilmCountriesInput = document.getElementById('editModal-film-countries-input');
    const editModalFilmMusiciansInput = document.getElementById('editModal-film-musicians-input');
    
    editModalFilmName.textContent = film.name;

    editModalFilmYearInput.value = film.year;

    editModalFilmDirectorInput.value = film.director;

    editModalFilmActorsInput.value = '';
    updateActorsList(film.name, deleteActor, editModalFilmActors);

    editModalFilmCinematographersInput.value = '';
    updateCinematographersList(film.name, deleteCinematographer, editModalFilmCinematographers);
    
    editModalFilmEditorsInput.value = '';
    updateEditorsList(film.name, deleteEditor, editModalFilmEditors);

    editModalFilmMusiciansInput.value = '';
    updateMusiciansList(film.name, deleteMusician, editModalFilmMusicians);

    editModalFilmTypesInput.value = '';
    updateTypesList(film.name, deleteType, editModalFilmTypes);

    editModalFilmCountriesInput.value = '';
    updateCountriesList(film.name, deleteCountry, editModalFilmCountries);

    editModalFilmDurationInput.value = film.duration;

    editModal.style.display = "flex";
}

function closeEditModal() {
    const editModal = document.getElementById('editModal');
    const editModalFilmName = document.getElementById('editModal-film-name').textContent.trim();
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === editModalFilmName.toLowerCase());
    openInfoModal(film);
    editModal.style.display = "none";
}

function showFilmsByDirector(director) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const directorFilms = films.filter(film => film.director === director);
    directorFilms.sort((a, b) => a.year - b.year);

    const directorModal = document.getElementById('directorModal');
    const directorModalName = document.getElementById('directorModal-name');
    const directorModalFilmList = document.getElementById('directorModal-film-list');

    directorModalName.innerHTML = `Films de <em>${director}</em> :`;
    directorModalFilmList.innerHTML = '';

    directorFilms.forEach(film => {
        const newFilm = document.createElement('div');
        newFilm.classList.add('directorModal-film-item'); // Ajouter une classe pour styliser chaque élément de la mosaïque

        const filmText = document.createElement('span-film');
        filmText.innerHTML = `${film.name} (${film.year})`;

        newFilm.addEventListener('click', function() {
            closeDirectorModal();
            openInfoModal(film);
        });

        newFilm.appendChild(filmText);
        directorModalFilmList.appendChild(newFilm);
        });

    directorModal.style.display = 'flex';
}

function closeDirectorModal() {
    const directorModal = document.getElementById('directorModal');
    directorModal.style.display = 'none';
}

function showFilmsByYear(year) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const yearFilms = films.filter(film => film.year === year);
    yearFilms.sort((a, b) => a.name.localeCompare(b.name));

    const yearModal = document.getElementById('yearModal');
    const yearModalName = document.getElementById('yearModal-name');
    const yearModalFilmList = document.getElementById('yearModal-film-list');

    yearModalName.innerHTML = `Films de l'année <em>${year}</em> :`;
    yearModalFilmList.innerHTML = '';

    yearFilms.forEach(film => {
        const newFilm = document.createElement('div');
        newFilm.classList.add('yearModal-film-item'); // Ajouter une classe pour styliser chaque élément de la mosaïque

        const filmText = document.createElement('span-film');
        filmText.innerHTML = `${film.name} - <em>${film.director}</em>`;

        newFilm.addEventListener('click', function() {
            closeYearModal();
            openInfoModal(film);
        });

        newFilm.appendChild(filmText);
        yearModalFilmList.appendChild(newFilm);
        });

    yearModal.style.display = 'flex';
}

function closeYearModal() {
    const yearModal = document.getElementById('yearModal');
    yearModal.style.display = 'none';
}

// Function to open add theme modal
function openAddThemeModal() {
    const addThemeModal = document.getElementById('addThemeModal');
    document.getElementById('theme-name-input').value = ''
    document.getElementById('theme-info-input').value = ''
    addThemeModal.style.display = 'flex';
}

// Function to close add theme modal
function closeAddThemeModal() {
    const addThemeModal = document.getElementById('addThemeModal');
    addThemeModal.style.display = 'none';
}

function showTheme(theme) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const themeFilms = films.filter(film => film.themes && film.themes.some(t => t.name === theme.name));

    if (themeFilms.length === 0) {
        alert("Aucun film trouvé pour ce thème.");
        return;
    }

    themeFilms.sort((a, b) => a.year - b.year);

    const themeModal = document.getElementById('themeModal');
    const themeModalTitle = document.getElementById('themeModal-title');
    const themeModalFilmList = document.getElementById('themeModal-film-list');

    themeModalTitle.textContent = `Films sur le thème "${theme.name}" :`;
    themeModalFilmList.innerHTML = '';

    themeFilms.forEach(film => {
        const newFilm = document.createElement('div');
        newFilm.classList.add('themeModal-film-item'); 

        const filmText = document.createElement('span-film');
        filmText.innerHTML = `${film.name} (${film.year}) - <em>${film.director}</em>`;

        newFilm.addEventListener('click', function() {
            closeThemeModal();
            openInfoModal(film);
        });

        newFilm.appendChild(filmText);
        themeModalFilmList.appendChild(newFilm);
    });

    themeModal.style.display = 'flex';
}

function closeThemeModal() {
    const themeModal = document.getElementById('themeModal');
    themeModal.style.display = 'none';
}

// Fonction pour ouvrir la modale et afficher les informations du thème et du film
function showThemeInfoModal(film, theme) {
    // Met à jour le titre de la modale avec le nom du thème
    document.getElementById('themeInfoModal-title').innerHTML = `Le thème "${theme.name}" dans <em>${film.name}</em> :`;
    
    // Met à jour le contenu de la modale avec le nom du film et les informations du thème
    document.getElementById('themeInfoModal-info').innerHTML = `${theme.info}`;
    
    // Affiche la modale
    document.getElementById('themeInfoModal').style.display = 'flex';
}

// Fonction pour fermer la modale
function closeThemeInfoModal() {
    // Cache la modale
    const updatedInfo = document.getElementById('themeInfoModal-info').value;
    
    // Extraire le nom du film entre les balises <em>
    let filmNameRegex = /<em>([^<]+)<\/em>/;
    let filmNameMatch = filmNameRegex.exec(document.getElementById('themeInfoModal-title').innerHTML);
    let filmName = filmNameMatch ? filmNameMatch[1] : '';

    // Récupérer les films depuis le stockage local
    const films = JSON.parse(localStorage.getItem('films')) || [];

    // Trouver le film correspondant dans la liste des films
    const film = films.find(film => film.name === filmName);
    document.getElementById('themeInfoModal').style.display = 'none';
    openInfoModal(film);
}

function showEditThemeInfoModal(film, theme) {
    // Met à jour le titre de la modale avec le nom du thème
    document.getElementById('editThemeInfoModal-title').innerHTML = `Le thème "${theme.name}" dans <em>${film.name}</em> :`;
    
    // Met à jour le contenu de la modale avec le nom du film et les informations du thème
    document.getElementById('editThemeInfoModal-info').value = theme.info;
    
    // Affiche la modale
    document.getElementById('editThemeInfoModal').style.display = 'flex';
}

function closeEditThemeInfoModal() {
    const editThemeInfoModal = document.getElementById('editThemeInfoModal');
    editThemeInfoModal.style.display = "none";
}

function showFilmsByActor(filmName, actor) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const actorFilms = films.filter(film => film.actors.includes(actor));
    actorFilms.sort((a, b) => a.year - b.year);

    const actorModal = document.getElementById('actorModal');
    const actorModalName = document.getElementById('actorModal-name');
    const actorModalFilmList = document.getElementById('actorModal-film-list');

    actorModalName.innerHTML = `Films avec <em>${actor}</em> :`;
    actorModalFilmList.innerHTML = '';

    actorFilms.forEach(film => {
        const newFilm = document.createElement('div');
        newFilm.classList.add('actorModal-film-item'); // Ajouter une classe pour styliser chaque élément de la mosaïque

        const filmText = document.createElement('span-film');
        filmText.innerHTML = `${film.name} (${film.year})`;

        newFilm.addEventListener('click', function() {
            closeActorModal();
            openInfoModal(film);
        });

        newFilm.appendChild(filmText);
        actorModalFilmList.appendChild(newFilm);
    });

    actorModal.style.display = 'flex';
}

function closeActorModal() {
    const actorModal = document.getElementById('actorModal');
    actorModal.style.display = 'none';
}

function showFilmsByMusician(filmName, musician) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const musicianFilms = films.filter(film => film.musicians.includes(musician));
    musicianFilms.sort((a, b) => a.year - b.year);

    const musicianModal = document.getElementById('musicianModal');
    const musicianModalName = document.getElementById('musicianModal-name');
    const musicianModalFilmList = document.getElementById('musicianModal-film-list');

    musicianModalName.innerHTML = `Filmographie de <em>${musician}</em> (musique) :`;
    musicianModalFilmList.innerHTML = '';

    musicianFilms.forEach(film => {
        const newFilm = document.createElement('div');
        newFilm.classList.add('musicianModal-film-item'); // Ajouter une classe pour styliser chaque élément de la mosaïque

        const filmText = document.createElement('span-film');
        filmText.innerHTML = `${film.name} (${film.year})`;

        newFilm.addEventListener('click', function() {
            closeMusicianModal();
            openInfoModal(film);
        });

        newFilm.appendChild(filmText);
        musicianModalFilmList.appendChild(newFilm);
    });

    musicianModal.style.display = 'flex';
}

function closeMusicianModal() {
    const musicianModal = document.getElementById('musicianModal');
    musicianModal.style.display = 'none';
}

function showFilmsByType(filmName, type) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const typeFilms = films.filter(film => film.types.includes(type));
    typeFilms.sort((a, b) => a.year - b.year);

    const typeModal = document.getElementById('typeModal');
    const typeModalName = document.getElementById('typeModal-name');
    const typeModalFilmList = document.getElementById('typeModal-film-list');

    typeModalName.innerHTML = `Films de genre <em>${type}</em> :`;
    typeModalFilmList.innerHTML = '';

    typeFilms.forEach(film => {
        const newFilm = document.createElement('div');
        newFilm.classList.add('typeModal-film-item'); 

        const filmText = document.createElement('span-film');
        filmText.innerHTML = `${film.name} (${film.year})`;

        newFilm.addEventListener('click', function() {
            closeTypeModal();
            openInfoModal(film);
        });

        newFilm.appendChild(filmText);
        typeModalFilmList.appendChild(newFilm);
    });

    typeModal.style.display = 'flex';
}

function closeTypeModal() {
    const typeModal = document.getElementById('typeModal');
    typeModal.style.display = 'none';
}

function showFilmsByCountry(filmName, country) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const countryFilms = films.filter(film => film.countries.includes(country));
    countryFilms.sort((a, b) => a.year - b.year);

    const countryModal = document.getElementById('countryModal');
    const countryModalName = document.getElementById('countryModal-name');
    const countryModalFilmList = document.getElementById('countryModal-film-list');

    countryModalName.innerHTML = `Films du pays <em>${country}</em> :`;
    countryModalFilmList.innerHTML = '';

    countryFilms.forEach(film => {
        const newFilm = document.createElement('div');
        newFilm.classList.add('countryModal-film-item'); 

        const filmText = document.createElement('span-film');
        filmText.innerHTML = `${film.name} (${film.year})`;

        newFilm.addEventListener('click', function() {
            closeCountryModal();
            openInfoModal(film);
        });

        newFilm.appendChild(filmText);
        countryModalFilmList.appendChild(newFilm);
    });

    countryModal.style.display = 'flex';
}

function closeCountryModal() {
    const countryModal = document.getElementById('countryModal');
    countryModal.style.display = 'none';
}

function showFilmsByCinematographer(filmName, cinematographer) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const cinematographerFilms = films.filter(film => film.cinematographers.includes(cinematographer));
    cinematographerFilms.sort((a, b) => a.year - b.year);
    
    const cinematographerModal = document.getElementById('cinematographerModal');
    const cinematographerModalName = document.getElementById('cinematographerModal-name');
    const cinematographerModalFilmList = document.getElementById('cinematographerModal-film-list');

    cinematographerModalName.innerHTML = `Films de <em>${cinematographer}</em> (photographie) :`;
    cinematographerModalFilmList.innerHTML = '';

    cinematographerFilms.forEach(film => {
        const newFilm = document.createElement('div');
        newFilm.classList.add('cinematographerModal-film-item'); // Ajouter une classe pour styliser chaque élément de la mosaïque

        const filmText = document.createElement('span-film');
        filmText.innerHTML = `${film.name} (${film.year})`;

        newFilm.addEventListener('click', function() {
            closeCinematographerModal();
            openInfoModal(film);
        });

        newFilm.appendChild(filmText);
        cinematographerModalFilmList.appendChild(newFilm);
    });

    cinematographerModal.style.display = 'flex';
}

function closeCinematographerModal() {
    const cinematographerModal = document.getElementById('cinematographerModal');
    cinematographerModal.style.display = 'none';
}

function showFilmsByEditor(filmName, editor) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const editorFilms = films.filter(film => film.editors.includes(editor));
    editorFilms.sort((a, b) => a.year - b.year);

    const editorModal = document.getElementById('editorModal');
    const editorModalName = document.getElementById('editorModal-name');
    const editorModalFilmList = document.getElementById('editorModal-film-list');

    editorModalName.innerHTML = `Filmographie de <em>${editor}</em> (montage) :`;
    editorModalFilmList.innerHTML = '';

    editorFilms.forEach(film => {
        const newFilm = document.createElement('div');
        newFilm.classList.add('editorModal-film-item'); // Ajouter une classe pour styliser chaque élément de la mosaïque

        const filmText = document.createElement('span');
        filmText.innerHTML = `${film.name} (${film.year})`;

        newFilm.addEventListener('click', function() {
            closeEditorModal();
            openInfoModal(film);
        });

        newFilm.appendChild(filmText);
        editorModalFilmList.appendChild(newFilm);
    });

    editorModal.style.display = 'flex';
}

function closeEditorModal() {
    const editorModal = document.getElementById('editorModal');
    editorModal.style.display = 'none';
}
