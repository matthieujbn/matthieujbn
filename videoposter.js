document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('infoModal-videoPlayer');

    // Ajouter un gestionnaire d'événements pour basculer entre muet et non muet
    videoPlayer.addEventListener('click', () => {
        videoPlayer.muted = !videoPlayer.muted;
    });
});


const fileInput = document.getElementById('fileInput');

function addVideoLink() {
    fileInput.addEventListener('change', handleVideoFileChange);
    fileInput.click();
	fileInput.removeEventListener('change', removeEventListener);
}

function handleVideoFileChange() {
	const infoModalFilmName = document.getElementById('infoModal-film-name').textContent;
	const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === infoModalFilmName.toLowerCase());
    const file = fileInput.files[0];
    if (file) {
        films[filmIndex].video[0] = file.name;
        localStorage.setItem('films', JSON.stringify(films));
    }
}

function openVideo(filmName) {
	const posterContent = document.getElementById('infoModal-poster-container');
	const films = JSON.parse(localStorage.getItem('films')) || [];
	const film = films.find(film => film.name.toLowerCase() === filmName.toLowerCase());
	if (film.video[0] !== undefined && film.video[0] !== '') {
		posterContent.style.display = "flex";
		const videoPlayer = document.getElementById('infoModal-videoPlayer');
	    videoPlayer.src = './Videos/' + film.video[0];
	    videoPlayer.load();
	    videoPlayer.play();
	    videoPlayer.loop = true;
	    videoPlayer.muted = true;
	}
	else {
		posterContent.style.display = "none";
	}
}

function removeLinks() {
	const infoModalFilmName = document.getElementById('infoModal-film-name').textContent;
	const films = JSON.parse(localStorage.getItem('films')) || [];
    const filmIndex = films.findIndex(film => film.name.toLowerCase() === infoModalFilmName.toLowerCase());
    films[filmIndex].video = [];
    localStorage.setItem('films', JSON.stringify(films));
}