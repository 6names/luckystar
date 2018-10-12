// Browser detect
(function browsers() {
    var pageHtml = document.querySelector('html');
    
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    iOS && pageHtml.classList.add('ios');
    
    var browserDetect = {
        matchGroups: [
            [
                {uaString: 'win', className: 'win'},
                {uaString: 'mac', className: 'mac'},
                {uaString: 'android', className: 'android'},
                {uaString: 'linux', className: 'linux'}
            ],
            [
                {uaString: 'msie', className: 'trident'},
                {uaString: 'applewebkit', className: 'webkit'},
                {uaString: 'gecko', className: 'gecko'},
                {uaString: 'opera', className: 'presto'}
            ],
            [
                {uaString: 'msie 10.0', className: 'ie10'},
                {uaString: 'firefox', className: 'firefox'},
                {uaString: 'opera', className: 'opera'},
                {uaString: 'chrome', className: 'chrome'},
                {uaString: 'safari', className: 'safari'},
                {uaString: 'unknown', className: 'unknown'}
            ]
        ],
        
        init: function () {
            
            return {
                det: this.detect(),
                ts: this
            }
        },
        addClass: function (a) {
            this.pageHolder = {
                doc: document.documentElement,
                cl: document.documentElement.className += ' ' + a
            }
        },
        detect: function () {
            var a, s = 0;
            for (; s < this.matchGroups.length; s++) {
                a = this.matchGroups[s];
                var e, i = 0;
                for (; i < a.length; i++) {
                    
                    if (e = a[i] || 'string' === typeof e.uaString) {
                        if (this.uaMatch(e.uaString)) {
                            this.addClass(e.className);
                            break
                        }
                    } else {
                        for (var t = 0, r = !0; t < e.uaString.length; t++) if (!this.uaMatch(e.uaString[t])) {
                            r = !1;
                            break
                        }
                        if (r) {
                            this.addClass(e.className);
                            break
                        }
                    }
                }
            }
        },
        uaMatch: function (a) {
            
            return this.ua || (this.ua = navigator.userAgent.toLowerCase()), -1 !== this.ua.indexOf(a)
        }
    };
    browserDetect.init();
    
    
    // pixel ratio
    var retina = window.devicePixelRatio > 1 ? 'retina' : 'no-retina';
    pageHtml.classList.add(retina);
    
    if (pageHtml.classList.contains('ios') || pageHtml.classList.contains('android')) {
        pageHtml.classList.add('mobile');
    } else {
        pageHtml.classList.add('desktop');
    }
})();

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

var tabs = function (triggers, contents, cb, parent) {
    if (!parent) {
        parent = document;
    }
    
    var trigger = parent.querySelectorAll(triggers);
    var content = parent.querySelectorAll(contents);
    
    forLoop(trigger.length, function (i) {
        trigger[i].addEventListener('click', function () {
            if (trigger[i].classList.contains('active')) {
                trigger[i].classList.remove('active');
                content[i].classList.remove('active');
            } else {
                forLoop(trigger.length, function (j) {
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

// Check if content loaded
document.addEventListener('DOMContentLoaded', function () {
    // Accordions
    accordion('.header__contacts-trigger', '.header__contacts-list');
    accordion('.main__trigger', '.main__content');
    accordion('.nav__trigger', '.nav__list');

});