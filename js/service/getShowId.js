export function getShowId(element) {
    $(element).click((event) => {
        const id = event.currentTarget.id;
        sessionStorage.setItem('showId', id);
    });
}