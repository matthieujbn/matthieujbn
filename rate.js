function colorButton(num) {
    const filmName = document.getElementById('infoModal-film-name').textContent;
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
    var buttons = document.getElementsByClassName("rate-button");
    saveNote(filmName, num)
    for (var i = 0; i < buttons.length; i++) {
        if (i < film.rate) {
            buttons[i].classList.add("selected");
        } else {
            buttons[i].classList.remove("selected");
        }
    }
    colorHover(num)
}

function colorHover(num) {
    var buttons = document.getElementsByClassName("rate-button");
    for (var i = 0; i < buttons.length; i++) {
        if (i < num) {
            buttons[i].classList.add("selected");
        } else {
            buttons[i].classList.remove("selected");
        }
    }
}

function setRateButton() {
    const filmName = document.getElementById('infoModal-film-name').textContent;
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
    var buttons = document.getElementsByClassName("rate-button");
    for (var i = 0; i < buttons.length; i++) {
        if (i < film.rate) {
            buttons[i].classList.add("selected");
        } else {
            buttons[i].classList.remove("selected");
        }
    }
}

function saveNote(filmName, note) {
    const films = JSON.parse(localStorage.getItem('films')) || [];
    const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
    film.rate = note;
    localStorage.setItem('films', JSON.stringify(films));
}