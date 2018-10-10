import {createTag, getXHR} from "./helpers";

export const uiIcons = function () {
    const footer = document.querySelector('.footer');
    const icons = createTag('ui-icons');
    footer.insertAdjacentElement('afterend', icons);
    getXHR('images/ui/ui-icons.svg', (response) => {
        icons.innerHTML = response;
    });
};
