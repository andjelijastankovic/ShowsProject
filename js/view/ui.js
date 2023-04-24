export function empty() {
    $('#popularShows').hide();
    $('#popularShows').empty();
    $('#aboutShow').hide();
    $('#aboutShow').empty();
}

export function resetSearch() {
    $('#search').val('');
}

export function controlDropdown() {
    $('.drop').css('display', 'none');
    $('.drop').html('');
}

export function searchDropdown(show) {
    const drop = `<li id='${show.id}'><a>${show.name}</a></li>`;
    $('.drop').append(drop);
    $('.drop').css('display', 'block');
}

export function noEntry(element, string) {
    $(element).append(`<li>There are no <b>${string}</b> entries yet.</li>`);
}

export function popularShowsStyle() {
    $('#popularShows').append('<h2>Popular shows</h2>');
    $('#popularShows').append(`<div class='shows'></div>`);
}

export function popularShows(shows) {
    const show = `<div class='show'><img src='${shows.image.medium}' id='${shows.id}'> <p>${shows.name}</p></div>`;
    $('.shows').append(show);
}

export function aboutShowStyle() {
    $('#aboutShow').show();
    $('#aboutShow').append(`<div class='divTitle'></div>`);
    $('#aboutShow').append(`<div class='divImgSeasonCast'></div>`);
    $('.divImgSeasonCast').append(`<div class='imgDiv'></div>`);
    $('.divImgSeasonCast').append(`<div class='divSeasonCast'></div>`);
    $('.divSeasonCast').append(`<div class='divSeason'></div>`);
    $('.divSeason').append('<h2>Seasons</h2>');
    $('.divSeason').append(`<ul class='seasonList'></ul>`);
    $('.divSeasonCast').append(`<div class='divCast'></div>`);
    $('.divCast').append('<h2>Cast</h2>');
    $('.divCast').append(`<ul class='castList'></ul>`);
    $('#aboutShow').append(`<div class='divSummary'></div>`);
    $('.divSummary').append('<h2>Show details</h2');
    $('#aboutShow').append(`<div class='akaCrew'></div>`);
    $('.akaCrew').append(`<div class='akas'></div>`);
    $('.akas').append('<h2>AKA\'s</h2>');
    $('.akas').append(`<ul class='akasList'></ul>`);
    $('.akaCrew').append(`<div class='crew'></div>`);
    $('.crew').append('<h2>Crew</h2>');
    $('.crew').append(`<ul class='crewList'></ul>`);
    $('#aboutShow').append(`<div class='episodes'></div>`);
    $('.episodes').append('<h2>Episodes</h2>');
    $('.episodes').append(`<ul class='episodesList'></ul>`);
}

export function showNameImageSummary(show) {
    if (show.image == null) {
        show.image = './images/no-img-portrait-text.png';
    } else {
        show.image = show.image.original;
    }

    if (show.summary == '' || show.summary == null) {
        show.summary = `We don't have a summary for <b>${show.name}</b> yet.`;
    }

    $('.divTitle').append(`<h2>${show.name}</h2>`);
    $('.imgDiv').append(`<img src='${show.image}'>`);
    $('.divSummary').append(show.summary);
}

export function dateString(date) {
    if(date == null) {
        date = 'unknown';
    } else {
        let newDate = date.split('-');
        return `${newDate[2]}.${newDate[1]}.${newDate[0]}.`;
    }
}

export function seasonNumber(number) {
    $('.divSeason > h2').append(` <span>(${number})</span>`);
}

export function showSeasons(season) {
    if (season.premiere == null) {
        season.premiere = 'unknown date';
    }

    if (season.end == null) {
        season.end = 'unknown date';
    }

    $('.seasonList').append(`<li>Premiere date: ${season.premiere} - End date: ${season.end}</li>`);
}

export function showCasts(cast) {
    $('.castList').append(`<li>${cast.person} (<span class='char'>${cast.character}</span>)</li>`);
}

export function showAKAs(aka) {
    if (aka.countryName == null) {
        $('.akasList').append(`<li>${aka.showName} <span>(unknown)</span></li>`);
    } else {
        $('.akasList').append(`<li>${aka.showName} <span>(${aka.countryName.name})</span></li>`);
    }
}

export function showCrews(crew) {
    $('.crewList').append(`<li>${crew.name} <span>(${crew.role})</span></li>`);
}

export function showEpisodes(episode) {
    if (episode.eRating == null) {
        $('.episodesList').append(`<li>S${episode.sNum}E${episode.eNum}: ${episode.eName}</li>`);
    } else {
        $('.episodesList').append(`<li>S${episode.sNum}E${episode.eNum}: ${episode.eName} (rating: ${episode.eRating})</li>`);
    }
}