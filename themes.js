document.addEventListener('DOMContentLoaded', (event) => {
    loadThemes();
});

function loadThemes() {
    const themeList = document.getElementById('theme-list');
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const uniqueThemes = new Set(); // Ensemble pour stocker les thèmes uniques

    // Parcourir tous les films et ajouter les thèmes à l'ensemble
    films.forEach(film => {
        if (film.themes && film.themes.length > 0) {
            film.themes.forEach(theme => {
                uniqueThemes.add(theme); // Ajouter chaque thème à l'ensemble
            });
        }
    });

    const sortedThemes = Array.from(uniqueThemes).sort();

    themeList.innerHTML = '';

    // Ajouter chaque thème unique à la liste des thèmes dans le document HTML
    sortedThemes.forEach(theme => {
        const themeElement = document.createElement('div');
        themeElement.classList.add('theme-item'); 
        const themeText = document.createElement('span-film');
        themeText.innerHTML = `${theme}`;
        themeElement.appendChild(themeText);
        themeList.appendChild(themeElement);
    });
}
