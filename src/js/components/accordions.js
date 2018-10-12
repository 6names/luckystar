import {forLoop} from "./helpers";

export const accordion = (triggers, contents, parent) => {
    if (!parent) {
        parent = document;
    }
    
    const trigger = parent.querySelectorAll(triggers);
    const content = parent.querySelectorAll(contents);
    
    forLoop(trigger.length, (i) => {
        trigger[i].addEventListener('click', () => {
            if (trigger[i].classList.contains('active')) {
                trigger[i].classList.remove('active');
                content[i].classList.remove('active');
            } else {
                trigger[i].classList.add('active');
                content[i].classList.add('active');
            }
        });
    });
};

export const tabs = (triggers, contents, cb, parent) => {
    if (!parent) {
        parent = document;
    }
    
    const trigger = parent.querySelectorAll(triggers);
    const content = parent.querySelectorAll(contents);
    forLoop(trigger.length, (i) => {
        trigger[i].addEventListener('click', () => {
            if (trigger[i].classList.contains('active')) {
                trigger[i].classList.remove('active');
                content[i].classList.remove('active');
            } else {
                forLoop(trigger.length, (j) => {
                    trigger[j].classList.remove('active');
                    content[j].classList.remove('active');
                });
                
                trigger[i].classList.add('active');
                content[i].classList.add('active');
                
                if (cb) {
                    cb(i);
                }
            }
        });
    });
};

export const hideDropdownOnDocumentClick = (trigger, content) => {
    document.addEventListener('click', (e) => {
        if (!e.target.matches(trigger)) {
            document.querySelector(trigger).classList.remove('active');
            document.querySelector(content).classList.remove('active');
        }
    });
};

