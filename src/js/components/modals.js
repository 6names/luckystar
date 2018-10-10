import {initInner} from "./initInner";
import {forLoop, getXHR} from "./helpers";

// Create modal holder
export const createModalHolder = () => {
    const footer = document.querySelector('.footer');
    const modalH = document.createElement('div');
    modalH.className = 'modal-holder';
    footer.insertAdjacentElement('afterend', modalH);
};
createModalHolder();
export const modalHolder = document.querySelector('.modal-holder');

// Scroll width
export const getScrollBarWidth = () => {
    const inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';
    
    const outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild(inner);
    
    document.body.appendChild(outer);
    let w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    let w2 = inner.offsetWidth;
    if (w1 === w2) w2 = outer.clientWidth;
    document.body.removeChild(outer);
    
    return w1 - w2;
};

// remove modal
export const removeModal = () => {
    if (modalHolder) {
        modalHolder.addEventListener('click', function (e) {
            if (e.target.classList.contains('modal__close')) {
                modalHolder.innerHTML = '';
                modalHolder.classList.remove('modal-holder_active');
                document.body.classList.remove('modal-open');
                document.body.removeAttribute('style');
                e.preventDefault();
            }
        });
    }
};

// Close modal
export const closeModal = () => {
    if (modalHolder) {
        modalHolder.innerHTML = '';
        modalHolder.classList.remove('modal-holder_active');
        document.body.classList.remove('modal-open');
        document.body.removeAttribute('style');
    }
};

// Test modal
export const testModal = (target, callBack) => {
    getXHR(`modals/${target}.html`, (response) => {
        modalHolder.innerHTML = `
            <div class="modal" tabindex="-1">
                <div class="modal__row">
                    <div class="modal__cell">
                        ${response}
                        <div class="modal__close modal__close_wide"></div>
                    </div>
                </div>
            </div>`;
    
        modalHolder.classList.add('modal-holder_active');
        document.body.classList.add('modal-open');
        document.body.style.paddingRight = getScrollBarWidth() + 'px';
        document.querySelector('.modal__frame').classList.add('active');
    
        initInner();
        removeModal();
    
        if (callBack) {
            callBack(modalHolder);
        }
    });
};

// Get modal
export const getModal = (callBack) => {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    forLoop(modalTriggers.length, (i) => {
        modalTriggers[i].addEventListener('click', function (e) {
            const target = e.currentTarget.getAttribute('data-target');
        
            getXHR(`modals/${target}.html`, (response) => {
                modalHolder.innerHTML = `
                    <div class="modal" tabindex="-1">
                        <div class="modal__row">
                            <div class="modal__cell">
                                ${response}
                                <div class="modal__close modal__close_wide"></div>
                            </div>
                        </div>
                    </div>`;
            
                modalHolder.classList.add('modal-holder_active');
                document.body.classList.add('modal-open');
                document.body.style.paddingRight = getScrollBarWidth() + 'px';
                document.querySelector('.modal__frame').classList.add('active');
            
                initInner();
                removeModal();
            
                if (callBack) {
                    callBack(modalHolder);
                }
            });
        });
    });
};