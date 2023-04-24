import { getData, getTop50, getTop10 } from "./service/service.js";
import { getShowId } from "./service/getShowId.js";
import {
    controlDropdown, searchDropdown,
    resetSearch, noEntry,
    popularShowsStyle, popularShows,
    aboutShowStyle, showNameImageSummary,
    dateString, seasonNumber, showSeasons,
    showCasts, showAKAs, showCrews, showEpisodes, empty
}
    from "./view/ui.js";

import { Aka } from "./entities/aka.js";
import { Cast } from "./entities/cast.js";
import { Crew } from "./entities/crew.js";
import { Episode } from "./entities/episode.js";
import { Season } from "./entities/season.js";
import { Show } from "./entities/show.js";

var showsApi = 'http://api.tvmaze.com/shows';
const searchApi = 'http://api.tvmaze.com/search/shows?q=';
$(document).ready(() => {
    allShows();
});

$(document).click(function () {
    controlDropdown();
    resetSearch();
});

$('#search').keyup(search);

function search() {
    let searchValue = encodeURIComponent($('#search').val());
    let api = searchApi.concat(searchValue);
    getData(api).then(response => {
        controlDropdown();
        const top10 = getTop10(response);
        top10.forEach(element => {
            const show = new Show(element.show.id, element.show.name, element.show.image, element.show.summary);
            searchDropdown(show);
        });

        getShowId('li');

        $('li').click(() => {
            empty();
            aboutShowStyle();
            showInfo();
            showSeason();
            showCast();
            showAKA();
            showCrew();
            showEpisode();
        });
    });
}

function allShows() {
    getData(showsApi).then(response => {
        const top50 = getTop50(response);
        popularShowsStyle();
        top50.forEach(element => {
            const show = new Show(element.id, element.name, element.image, element.summary);
            popularShows(show);
        });
        getShowId('img');
        $('img').click(() => {
            empty();
            aboutShowStyle();
            showInfo();
            showSeason();
            showCast();
            showAKA();
            showCrew();
            showEpisode();
        });
    });
}

function showInfo() {
    const id = sessionStorage.getItem('showId');
    getData(`${showsApi}/${id}`).then(response => {
        const show = new Show(response.id, response.name, response.image, response.summary);
        showNameImageSummary(show);
    });
}

function showSeason() {
    const id = sessionStorage.getItem('showId');
    getData(`${showsApi}/${id}/seasons`).then(response => {
        let numberOfSeasons = response.length;
        seasonNumber(numberOfSeasons);
        response.forEach(element => {
            let premiere = dateString(element.premiereDate);
            let end = dateString(element.endDate);
            const season = new Season(premiere, end);
            showSeasons(season);
        });
    });
}

function showCast() {
    const id = sessionStorage.getItem('showId');
    getData(`https://api.tvmaze.com/shows/${id}/cast`).then(response => {
        if (response.length == 0) {
            noEntry('.castList', 'Cast');
        } else {
            let top10 = response.slice(0, 10);
            top10.forEach(element => {
                const cast = new Cast(element.character.name, element.person.name);
                showCasts(cast);
            });
        }
    });
}

function showAKA() {
    const id = sessionStorage.getItem('showId');
    getData(`https://api.tvmaze.com/shows/${id}/akas`).then(response => {
        if (response.length == 0) {
            noEntry('.akasList', 'AKA\'s');
        } else {
            let top5 = response.slice(0, 5);
            top5.forEach(element => {
                const aka = new Aka(element.name, element.country);
                showAKAs(aka);
            });
        }
    });
}

function showCrew() {
    const id = sessionStorage.getItem('showId');
    getData(`https://api.tvmaze.com/shows/${id}/crew`).then(response => {
        if (response.length == 0) {
            noEntry('.crewList', 'Crew');
        } else {
            let top5 = response.slice(0, 5);
            top5.forEach(element => {
                const crew = new Crew(element.person.name, element.type);
                showCrews(crew);
            });
        }
    });
}

function showEpisode() {
    const id = sessionStorage.getItem('showId');
    getData(`https://api.tvmaze.com/shows/${id}/episodes`).then(response => {
        if(response.length == 0) {
            noEntry('.episodesList', 'Episodes');
        } else {
            response.forEach(element => {
                const episode = new Episode(element.season, element.number, element.name, element.rating.average);
                showEpisodes(episode);
            });
        }
    });
}