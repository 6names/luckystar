var forLoop = function (len, callback) {
    for (var i = 0; i < len; i += 1) {
        callback(i);
    }
};

var accordion = function (triggers, contents, parent) {
    if (!parent) {
        parent = document;
    }
    
    var trigger = parent.querySelectorAll(triggers);
    var content = parent.querySelectorAll(contents);
    
    forLoop(trigger.length, function (i) {
        var buttonText = trigger[i].querySelectorAll('.button-text');
        trigger[i].addEventListener('click', function () {
            if (trigger[i].classList.contains('active')) {
                trigger[i].classList.remove('active');
                content[i].classList.remove('active');
            } else {
                trigger[i].classList.add('active');
                content[i].classList.add('active');
            }
            
            if (buttonText.length > 0) {
                forLoop(buttonText.length, function (j) {
                    buttonText[j].classList.toggle('visually-hidden');
                });
            }
        });
    });
};

var tabs = function (triggers, contents, cb) {
    var trigger = document.querySelectorAll(triggers);
    var content = document.querySelectorAll(contents);
    
    if (trigger.length > 0) {
        forLoop(trigger.length, function (i) {
            trigger[i].addEventListener('click', function () {
                forLoop(trigger.length, function (j) {
                    trigger[j].classList.remove('active');
                    content[j].classList.remove('active');
                });
            
                trigger[i].classList.add('active');
                content[i].classList.add('active');
            
                // Callback for tabs
                if (cb) {
                    cb(i);
                }
            });
        });
    }
};

var detectCurrentTab = function () {
    var tabs = document.querySelectorAll('.main__tabs-link');
    var tabsList = document.querySelector('.main__tabs');
    var tabsTrigger = document.querySelector('.nav__trigger');
    
    if (tabs.length > 0) {
        tabsList.classList.add('active');
        tabsTrigger.classList.add('active');
        
        var tabsContents = document.querySelectorAll('.main__tabs-content');
        var target = window.location.hash.substr(1);
        
        forLoop(tabs.length, function (i) {
            var tab = tabs[i];
            var content = tabsContents[i];
            
            if (target === '') {
                tabs[0].classList.add('active');
                tabsContents[0].classList.add('active');
            } else {
                if (tab.dataset.target === target) {
                    tab.classList.add('active');
                }
                if (content.dataset.target === target) {
                    content.classList.add('active');
                }
            }
        })
    }
};

// Check if content loaded
document.addEventListener('DOMContentLoaded', function () {
    // Accordions
    accordion('.header__contacts-trigger', '.header__contacts-list');
    accordion('.main__trigger', '.main__content');
    accordion('.nav__trigger', '.nav__list');
    
    // Tabs
    detectCurrentTab();
    tabs('.main__tabs-link', '.main__tabs-content', function () {
        // Your Callback for tabs here
    });
});