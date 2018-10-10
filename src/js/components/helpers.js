// Loops
export const objectLoop = (object, callback) => {
    for (let item in object) {
        if (object.hasOwnProperty(item)) {
            callback(item);
        }
    }
};

export const forLoop = (len, callback) => {
    for (let i = 0; i < len; i += 1) {
        callback(i);
    }
};

export const objectTrueItems = (object) => {
    let iter = 0;
    for (let item in object) {
        if (object.hasOwnProperty(item) && object[item]) {
            iter += 1;
        }
    }
    return iter > 0;
};

// Numbers
export const addDigit = el => el < 10 ? `0${el}` : el;

// Ajax
export const getXHR = (target, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', target, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
};

// HTML
export const createTag = (elementClass, elementTag = 'div') => {
    const element = document.createElement(elementTag);
    element.className = elementClass;
    return element;
};

export const append = (parent, element) => parent.appendChild(element);

export const createIcon = (link) => {
    const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const useElem = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `#${link}`);
    svgElem.classList.add(link);
    append(svgElem, useElem);
    return svgElem;
};

export const createModalButton = (className, target, text) => {
    const button = createTag(className, 'button');
    button.classList.add('modal-trigger');
    button.dataset.target = target;
    if (text) {
        button.innerText = text;
    }
    return button;
};