import {append, createTag, forLoop} from "./helpers";

export const checkStyle = parent => {
    if (!parent) {
        parent = document;
    }
    const checkboxes = parent.querySelectorAll('input:not(.checkbox__item)[type=checkbox]');
    forLoop(checkboxes.length, (i) => {
        const check = checkboxes[i];
        const checkParent = check.parentElement;
        const label = createTag('checkbox__label', 'label');
        const checkItem = createTag('checkbox');
        check.className = 'checkbox__item';
    
        if (!check.id) {
            check.id = `check${i + 1}`;
        }
        label.setAttribute('for', check.id);
        checkParent.insertBefore(checkItem, check);
        append(checkItem, check);
        append(checkItem, label);
    });
};
