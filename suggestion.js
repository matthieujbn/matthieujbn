let films = [];
let filmsNames = [];
let filmsDirectors = [];
let filmsThemes = [];
let filmsCinematographers = [];
let filmsActors = [];
let filmsCountries = [];
let filmsTypes = [];
let filmsMusicians = [];
let filmsEditors = [];

function loadLists() { 
    films = JSON.parse(localStorage.getItem('films')) || [];
    filmsNames = films.map(film => film.name);

    const allDirectors = films.map(film => film.director);
    filmsDirectors = [...new Set(allDirectors)].sort();

    let allThemes = [];
    films.forEach(film => {
        if (film.themes && film.themes.length > 0) {
            allThemes = allThemes.concat(film.themes.map(theme => theme.name));
        }
    });
    filmsThemes = [...new Set(allThemes)].sort();

    let allCinematographers = [];
    films.forEach(film => {
        if (film.cinematographers && film.cinematographers.length > 0) {
            allCinematographers = allCinematographers.concat(film.cinematographers);
        }
    });
    filmsCinematographers = [...new Set(allCinematographers)].sort();

    let allActors = [];
    films.forEach(film => {
        if (film.actors && film.actors.length > 0) {
            allActors = allActors.concat(film.actors);
        }
    });
    filmsActors = [...new Set(allActors)].sort();

    let allCountries = [];
    films.forEach(film => {
        if (film.countries && film.countries.length > 0) {
            allCountries = allCountries.concat(film.countries);
        }
    });
    filmsCountries = [...new Set(allCountries)].sort();

    let allTypes = [];
    films.forEach(film => {
        if (film.types && film.types.length > 0) {
            allTypes = allTypes.concat(film.types);
        }
    });
    filmsTypes = [...new Set(allTypes)].sort();

    let allMusicians = [];
    films.forEach(film => {
        if (film.musicians && film.musicians.length > 0) {
            allMusicians = allMusicians.concat(film.musicians);
        }
    });
    filmsMusicians = [...new Set(allMusicians)].sort();

    let allEditors = [];
    films.forEach(film => {
        if (film.editors && film.editors.length > 0) {
            allEditors = allEditors.concat(film.editors);
        }
    });
    filmsEditors = [...new Set(allEditors)].sort();
}



function showSuggestions(inputID, suggestionContainerID, suggestionList, nbSuggestion) {
    const input = document.getElementById(inputID);
    const suggestionContainer = document.getElementById(suggestionContainerID);

    // Récupérer le texte entré dans le champ de saisie
    const inputText = input.value.trim().toLowerCase();

    // Vider les suggestions existantes
    suggestionContainer.innerHTML = '';

    // Filtrer les thèmes suggérés qui commencent par le texte entré
    const filteredSuggestions = suggestionList.filter(suggestion => suggestion.toLowerCase().includes(inputText));

    // Limiter le nombre de suggestions à afficher à 5 éléments au maximum
    const suggestionsToShow = filteredSuggestions.slice(0, nbSuggestion);

    // Afficher chaque suggestion dans le conteneur de suggestions
    suggestionsToShow.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.textContent = suggestion;
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.addEventListener('click', function() {
            input.value = suggestion;
            suggestionContainer.innerHTML = ''; // Cacher les suggestions une fois sélectionnée
        });
        suggestionContainer.appendChild(suggestionItem);
    });

    // Afficher le conteneur de suggestions s'il y a des suggestions disponibles
    suggestionContainer.style.display = suggestionsToShow.length > 0 ? 'block' : 'none';
}

document.getElementById('director-input').addEventListener('input', (event) => showSuggestions('director-input', 'director-suggestion-container', filmsDirectors, 1));
document.getElementById('theme-name-input').addEventListener('input', (event) => showSuggestions('theme-name-input', 'theme-suggestion-container', filmsThemes, 1));
document.getElementById('search-film-input').addEventListener('input', (event) => showSuggestions('search-film-input', 'search-film-suggestion-container', filmsNames, 5));
document.getElementById('editModal-film-director-input').addEventListener('input', (event) => showSuggestions('editModal-film-director-input', 'editModal-director-suggestion-container', filmsDirectors, 1));
document.getElementById('editModal-film-cinematographers-input').addEventListener('input', (event) => showSuggestions('editModal-film-cinematographers-input', 'editModal-cinematographers-suggestion-container', filmsCinematographers, 1));
document.getElementById('editModal-film-actors-input').addEventListener('input', (event) => showSuggestions('editModal-film-actors-input', 'editModal-actors-suggestion-container', filmsActors, 1));
document.getElementById('editModal-film-countries-input').addEventListener('input', (event) => showSuggestions('editModal-film-countries-input', 'editModal-countries-suggestion-container', filmsCountries, 1));
document.getElementById('editModal-film-types-input').addEventListener('input', (event) => showSuggestions('editModal-film-types-input', 'editModal-types-suggestion-container', filmsTypes, 1));
document.getElementById('editModal-film-musicians-input').addEventListener('input', (event) => showSuggestions('editModal-film-musicians-input', 'editModal-musicians-suggestion-container', filmsMusicians, 1));
document.getElementById('editModal-film-editors-input').addEventListener('input', (event) => showSuggestions('editModal-film-editors-input', 'editModal-editors-suggestion-container', filmsEditors, 1));

window.addEventListener('click', function(event) {
    const directorInput = document.getElementById('director-input');
    const directorSuggestionContainer = document.getElementById('director-suggestion-container');

    const themeInput = document.getElementById('theme-input');
    const themeSuggestionContainer = document.getElementById('theme-suggestion-container');

    const searchFilmInput = document.getElementById('search-film-input');
    const searchFilmSuggestionContainer = document.getElementById('search-film-suggestion-container');
    
    const editModalDirectorInput = document.getElementById('editModal-film-director-input');
    const editModalDirectorSuggestionContainer = document.getElementById('editModal-director-suggestion-container');

    const editModalCinematographersInput = document.getElementById('editModal-film-cinematographers-input');
    const editModalCinematographersSuggestionContainer = document.getElementById('editModal-cinematographers-suggestion-container');
    
    const editModalActorsInput = document.getElementById('editModal-film-actors-input');
    const editModalActorsSuggestionContainer = document.getElementById('editModal-actors-suggestion-container');

    const editModalCountriesInput = document.getElementById('editModal-film-countries-input');
    const editModalCountriesSuggestionContainer = document.getElementById('editModal-countries-suggestion-container');
    
    const editModalTypesInput = document.getElementById('editModal-film-types-input');
    const editModalTypesSuggestionContainer = document.getElementById('editModal-types-suggestion-container');

    const editModalMusiciansInput = document.getElementById('editModal-film-musicians-input');
    const editModalMusiciansSuggestionContainer = document.getElementById('editModal-musicians-suggestion-container');

    const editModalEditorsInput = document.getElementById('editModal-film-editors-input');
    const editModalEditorsSuggestionContainer = document.getElementById('editModal-editors-suggestion-container');


    if (event.target !== directorInput && event.target.parentNode !== directorSuggestionContainer) {
        directorSuggestionContainer.style.display = 'none';
    }

    if (event.target !== themeInput && event.target.parentNode !== themeSuggestionContainer) {
        themeSuggestionContainer.style.display = 'none';
    }

    if (event.target !== searchFilmInput && event.target.parentNode !== searchFilmSuggestionContainer) {
        searchFilmSuggestionContainer.style.display = 'none';
    }

    if (event.target !== editModalDirectorInput && event.target.parentNode !== editModalDirectorSuggestionContainer) {
        editModalDirectorSuggestionContainer.style.display = 'none';
    }

    if (event.target !== editModalCinematographersInput && event.target.parentNode !== editModalCinematographersSuggestionContainer) {
        editModalCinematographersSuggestionContainer.style.display = 'none';
    }

    if (event.target !== editModalActorsInput && event.target.parentNode !== editModalActorsSuggestionContainer) {
        editModalActorsSuggestionContainer.style.display = 'none';
    }

    if (event.target !== editModalCountriesInput && event.target.parentNode !== editModalCountriesSuggestionContainer) {
        editModalCountriesSuggestionContainer.style.display = 'none';
    }

    if (event.target !== editModalTypesInput && event.target.parentNode !== editModalTypesSuggestionContainer) {
        editModalTypesSuggestionContainer.style.display = 'none';
    }

    if (event.target !== editModalMusiciansInput && event.target.parentNode !== editModalMusiciansSuggestionContainer) {
        editModalMusiciansSuggestionContainer.style.display = 'none';
    }

    if (event.target !== editModalEditorsInput && event.target.parentNode !== editModalEditorsSuggestionContainer) {
        editModalEditorsSuggestionContainer.style.display = 'none';
    }
});
