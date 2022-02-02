import axios from "axios";

export function detect() {
    return !!document.getElementById('cardList');
}

export function initialize() {
    const cardListElem = document.getElementById('cardList');

    cardListElem.addEventListener('click', async function (ev) {
        const elem = ev.target;

        if (!elem.matches('.btn-delete-card')) {
            return;
        }

        const cardId = elem.dataset.id;

        try {
            const response = await axios.delete(`/cards/${cardId}`);

            elem.closest('tr').remove();
        } catch (e) {
            // TODO: should display an error message
        }
    }, { capture: true });
}
