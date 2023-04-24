export function getData(url) {
    return fetch(url).then(response=> {
        return response.json();
    });
}

export function getTop50(response) {
    let sortedRating = response.sort(function(a, b) {
        return b.rating.average - a.rating.average;
    });
    const top = sortedRating.slice(0, 50);
    return top;
}

export function getTop10(response) {
    let sortedRating = response.sort(function(a, b) {
        return b.show.rating.average - a.show.rating.average;
    });
    const top = sortedRating.slice(0, 10);
    return top;
}