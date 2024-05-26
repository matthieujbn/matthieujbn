function addActor() {
    const editModalFilmActors = document.getElementById('editModal-film-actors-input');
    const newActor = editModalFilmActors.value;
    const filmName = document.getElementById('editModal-film-name').textContent.trim();
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());

    const modalList = document.getElementById('editModal-film-actors');
    
    // Vérifier que l'acteur n'existe pas déjà pour ce film :
    const actorExists = films[filmIndex].actors.some(actor => actor.toLowerCase() === newActor.toLowerCase());
    if (newActor === '') {
        alert("Entrer un nom d'acteur")
    } else if (!actorExists) {
        films[filmIndex].actors.push(newActor);
        localStorage.setItem('films', JSON.stringify(films));
        editModalFilmActors.value = '';
        updateActorsList(films[filmIndex].name, deleteActor, modalList);
    }
    else {
        alert("Cet acteur est déjà renseigné pour ce film");
    }
}

function deleteActor(filmName, actor) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());
    const actorIndex = films[filmIndex].actors.indexOf(actor);
    const confirmation = confirm("Voulez-vous vraiment supprimer cet acteur pour ce film ?");
    if (confirmation) {
        if(actorIndex !== -1) {
            // Supprimer l'acteur du tableau des acteurs du film
            films[filmIndex].actors.splice(actorIndex, 1);
            localStorage.setItem('films', JSON.stringify(films));
            const modalList = document.getElementById('editModal-film-actors');
            updateActorsList(films[filmIndex].name, deleteActor, modalList);
            loadLists();
        } else {
            alert("L'acteur n'a pas été trouvé dans ce film.");
        }
    }
}

function updateActorsList(filmName, buttonFunction, modalList) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
    modalList.innerHTML = 'Acteurs :';

    film.actors.forEach((actor, index) => {
        const actorElement = document.createElement('span');
        actorElement.classList.add('element');
        actorElement.setAttribute('data-element', actor);
        actorElement.textContent = actor;
        
        actorElement.addEventListener('click', function() {
            buttonFunction(film.name, actor);
        });

        if (index > 0) {
            modalList.appendChild(document.createTextNode(", "));
        } else {
            modalList.appendChild(document.createTextNode(" "));
        }
        modalList.appendChild(actorElement);
    });
    loadLists();
}

function addType() {
    const editModalFilmTypes = document.getElementById('editModal-film-types-input');
    const newType = editModalFilmTypes.value;
    const filmName = document.getElementById('editModal-film-name').textContent.trim();
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());

    const modalList = document.getElementById('editModal-film-types');
    
    // Vérifier que l'acteur n'existe pas déjà pour ce film :
    const typeExists = films[filmIndex].types.some(type => type.toLowerCase() === newType.toLowerCase());
    if (newType === '') {
        alert("Entrer un type de film")
    } else if (!typeExists) {
        films[filmIndex].types.push(newType);
        localStorage.setItem('films', JSON.stringify(films));
        editModalFilmTypes.value = '';
        updateTypesList(films[filmIndex].name, deleteType, modalList);
    } else {
        alert("Cet type est déjà renseigné pour ce film");
    }
}

function deleteType(filmName, type) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());
    const typeIndex = films[filmIndex].types.indexOf(type);
    const confirmation = confirm("Voulez-vous vraiment supprimer ce type pour ce film ?");
    if (confirmation) { 
        if (typeIndex !== -1) {
            // Supprimer l'acteur du tableau des acteurs du film
            films[filmIndex].types.splice(typeIndex, 1);
            localStorage.setItem('films', JSON.stringify(films));
            const modalList = document.getElementById('editModal-film-types');
            updateTypesList(films[filmIndex].name, deleteType, modalList);
            loadLists();
        } else {
            alert("Le type n'a pas été trouvé dans ce film.");
        }
    }
}

function updateTypesList(filmName, buttonFunction, modalList) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
    modalList.innerHTML = 'Genre :';

    film.types.forEach((type, index) => {
        const typeElement = document.createElement('span');
        typeElement.classList.add('element');
        typeElement.setAttribute('data-element', type);
        typeElement.textContent = type;
        
        typeElement.addEventListener('click', function() {
            buttonFunction(film.name, type);
        });

        if (index > 0) {
            modalList.appendChild(document.createTextNode(", "));
        } else {
            modalList.appendChild(document.createTextNode(" "));
        }
        modalList.appendChild(typeElement);
    });
    loadLists();
}

function addCountry() {
    const editModalFilmCountries = document.getElementById('editModal-film-countries-input');
    const newCountry = editModalFilmCountries.value;
    const filmName = document.getElementById('editModal-film-name').textContent.trim();
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());

    const modalList = document.getElementById('editModal-film-countries');
    
    // Vérifier que l'acteur n'existe pas déjà pour ce film :
    const countryExists = films[filmIndex].countries.some(country => country.toLowerCase() === newCountry.toLowerCase());
    if (newCountry === '') {
        alert("Entrer un pays")
    } else if (!countryExists) {
        films[filmIndex].countries.push(newCountry);
        localStorage.setItem('films', JSON.stringify(films));
        editModalFilmCountries.value = '';
        updateCountriesList(films[filmIndex].name, deleteCountry, modalList);
    } else {
        alert("Cet pays est déjà renseigné pour ce film");
    }
}

function deleteCountry(filmName, country) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());
    const countryIndex = films[filmIndex].countries.indexOf(country);
    const confirmation = confirm("Voulez-vous vraiment supprimer ce pays pour ce film ?");
    if (confirmation) {
        if (countryIndex !== -1) {
            // Supprimer l'acteur du tableau des acteurs du film
            films[filmIndex].countries.splice(countryIndex, 1);
            localStorage.setItem('films', JSON.stringify(films));
            const modalList = document.getElementById('editModal-film-countries');
            updateCountriesList(films[filmIndex].name, deleteCountry, modalList);
            loadLists();
        } else {
            alert("Le pays n'a pas été trouvé dans ce film.");
        }
    }
}

function updateCountriesList(filmName, buttonFunction, modalList) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
    modalList.innerHTML = 'Pays :';

    film.countries.forEach((country, index) => {
        const countryElement = document.createElement('span');
        countryElement.classList.add('element');
        countryElement.setAttribute('data-element', country);
        countryElement.textContent = country;
        
        countryElement.addEventListener('click', function() {
            buttonFunction(film.name, country);
        });

        if (index > 0) {
            modalList.appendChild(document.createTextNode(", "));
        } else {
            modalList.appendChild(document.createTextNode(" "));
        }
        modalList.appendChild(countryElement);
    });
    loadLists();
}

function addMusician() {
    const editModalFilmMusicians = document.getElementById('editModal-film-musicians-input');
    const newMusician = editModalFilmMusicians.value;
    const filmName = document.getElementById('editModal-film-name').textContent.trim();
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());

    const modalList = document.getElementById('editModal-film-musicians');
    
    // Vérifier que le musicien n'existe pas déjà pour ce film :
    const musicianExists = films[filmIndex].musicians.some(musician => musician.toLowerCase() === newMusician.toLowerCase());
    if (newMusician === '') {
        alert("Entrer un nom de musicien");
    } else if (!musicianExists) {
        films[filmIndex].musicians.push(newMusician);
        localStorage.setItem('films', JSON.stringify(films));
        editModalFilmMusicians.value = '';
        updateMusiciansList(films[filmIndex].name, deleteMusician, modalList);
    } else {
        alert("Ce musicien est déjà renseigné pour ce film");
    }
}

function deleteMusician(filmName, musician) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());
    const musicianIndex = films[filmIndex].musicians.indexOf(musician);
    const confirmation = confirm("Voulez-vous vraiment supprimer ce musicien pour ce film ?");
    if (confirmation) {
        if (musicianIndex !== -1) {
            // Supprimer le musicien du tableau des musiciens du film
            films[filmIndex].musicians.splice(musicianIndex, 1);
            localStorage.setItem('films', JSON.stringify(films));
            const modalList = document.getElementById('editModal-film-musicians');
            updateMusiciansList(films[filmIndex].name, deleteMusician, modalList);
            loadLists();
        } else {
            alert("Le musicien n'a pas été trouvé dans ce film.");
        }
    }
}

function updateMusiciansList(filmName, buttonFunction, modalList) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
    modalList.innerHTML = 'Musique :';

    film.musicians.forEach((musician, index) => {
        const musicianElement = document.createElement('span');
        musicianElement.classList.add('element');
        musicianElement.setAttribute('data-element', musician);
        musicianElement.textContent = musician;
        
        musicianElement.addEventListener('click', function() {
            buttonFunction(film.name, musician);
        });

        if (index > 0) {
            modalList.appendChild(document.createTextNode(", "));
        } else {
            modalList.appendChild(document.createTextNode(" "));
        }
        modalList.appendChild(musicianElement);
    });
    loadLists();
}

function addCinematographer() {
    const editModalFilmCinematographers = document.getElementById('editModal-film-cinematographers-input');
    const newCinematographer = editModalFilmCinematographers.value;
    const filmName = document.getElementById('editModal-film-name').textContent.trim();
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());

    const modalList = document.getElementById('editModal-film-cinematographers');
    
    // Vérifier que le cinématographe n'existe pas déjà pour ce film :
    const cinematographerExists = films[filmIndex].cinematographers.some(cinematographer => cinematographer.toLowerCase() === newCinematographer.toLowerCase());
    if (newCinematographer === '') {
        alert("Entrer un nom de cinématographe");
    } else if (!cinematographerExists) {
        films[filmIndex].cinematographers.push(newCinematographer);
        localStorage.setItem('films', JSON.stringify(films));
        editModalFilmCinematographers.value = '';
        updateCinematographersList(films[filmIndex].name, deleteCinematographer, modalList);
    } else {
        alert("Ce cinématographe est déjà renseigné pour ce film");
    }
}

function deleteCinematographer(filmName, cinematographer) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());
    const cinematographerIndex = films[filmIndex].cinematographers.indexOf(cinematographer);
    const confirmation = confirm("Voulez-vous vraiment supprimer ce directeur de la photographie pour ce film ?");
    if (confirmation) {
        if (cinematographerIndex !== -1) {
            // Supprimer le cinématographe du tableau des cinématographes du film
            films[filmIndex].cinematographers.splice(cinematographerIndex, 1);
            localStorage.setItem('films', JSON.stringify(films));
            const modalList = document.getElementById('editModal-film-cinematographers');
            updateCinematographersList(films[filmIndex].name, deleteCinematographer, modalList);
            loadLists();
        } else {
            alert("Ce directeur de la photographie n'a pas été trouvé dans ce film.");
        }
    }
}

function updateCinematographersList(filmName, buttonFunction, modalList) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
    modalList.innerHTML = 'Photographie :';

    film.cinematographers.forEach((cinematographer, index) => {
        const cinematographerElement = document.createElement('span');
        cinematographerElement.classList.add('element');
        cinematographerElement.setAttribute('data-element', cinematographer);
        cinematographerElement.textContent = cinematographer;
        
        cinematographerElement.addEventListener('click', function() {
            buttonFunction(film.name, cinematographer);
        });

        if (index > 0) {
            modalList.appendChild(document.createTextNode(", "));
        } else {
            modalList.appendChild(document.createTextNode(" "));
        }
        modalList.appendChild(cinematographerElement);
    });
    loadLists();
}

function addEditor() {
    const editModalFilmEditors = document.getElementById('editModal-film-editors-input');
    const newEditor = editModalFilmEditors.value;
    const filmName = document.getElementById('editModal-film-name').textContent.trim();
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());

    const modalList = document.getElementById('editModal-film-editors');
    
    // Vérifier que l'éditeur n'existe pas déjà pour ce film :
    const editorExists = films[filmIndex].editors.some(editor => editor.toLowerCase() === newEditor.toLowerCase());
    if (newEditor === '') {
        alert("Entrer un nom d'éditeur");
    } else if (!editorExists) {
        films[filmIndex].editors.push(newEditor);
        localStorage.setItem('films', JSON.stringify(films));
        editModalFilmEditors.value = '';
        updateEditorsList(films[filmIndex].name, deleteEditor, modalList);
    } else {
        alert("Cet éditeur est déjà renseigné pour ce film");
    }
}

function deleteEditor(filmName, editor) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === filmName.toLowerCase());
    const editorIndex = films[filmIndex].editors.indexOf(editor);
    const confirmation = confirm("Voulez-vous vraiment supprimer cet éditeur pour ce film ?");
    if (confirmation) {
        if (editorIndex !== -1) {
            // Supprimer l'éditeur du tableau des éditeurs du film
            films[filmIndex].editors.splice(editorIndex, 1);
            localStorage.setItem('films', JSON.stringify(films));
            const modalList = document.getElementById('editModal-film-editors');
            updateEditorsList(films[filmIndex].name, deleteEditor, modalList);
            loadLists();
        } else {
            alert("Cet éditeur n'a pas été trouvé dans ce film.");
        }
    }
}

function updateEditorsList(filmName, buttonFunction, modalList) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
    modalList.innerHTML = 'Montage  :';

    film.editors.forEach((editor, index) => {
        const editorElement = document.createElement('span');
        editorElement.classList.add('element');
        editorElement.setAttribute('data-element', editor);
        editorElement.textContent = editor;
        
        editorElement.addEventListener('click', function() {
            buttonFunction(film.name, editor);
        });

        if (index > 0) {
            modalList.appendChild(document.createTextNode(", "));
        } else {
            modalList.appendChild(document.createTextNode(" "));
        }
        modalList.appendChild(editorElement);
    });
    loadLists();
}

function updateDurationTypeCountryList(film) {
    const infoModalp = document.getElementById('infoModal-film-duration-type-country');
    infoModalp.innerHTML = '';

    if (film.duration.length !== 0) {
        infoModalp.innerHTML = film.duration;
    }

    if (film.types.length !== 0) {
        if (film.duration.length !== 0) {
            infoModalp.appendChild(document.createTextNode(" - "));
        }

        film.types.forEach((type, index) => {
            const element = document.createElement('span');
            element.classList.add('element');
            element.setAttribute('data-element', type);
            element.textContent = type;

            element.addEventListener('click', function() {
                showFilmsByType(film.name, type);
            });

            if (index > 0) {
                infoModalp.appendChild(document.createTextNode(", "));
            }
            infoModalp.appendChild(element);
        });
    }

    if (film.countries.length !== 0) {
        if (film.duration.length !== 0 || film.types.length !== 0) {
            infoModalp.appendChild(document.createTextNode(" - "));
        }

        film.countries.forEach((country, index) => {
            const element = document.createElement('span');
            element.classList.add('element');
            element.setAttribute('data-element', country);
            element.textContent = country;

            element.addEventListener('click', function() {
                showFilmsByCountry(film.name, country);
            });

            if (index > 0) {
                infoModalp.appendChild(document.createTextNode(", "));
            }
            infoModalp.appendChild(element);
        });
    }
}

