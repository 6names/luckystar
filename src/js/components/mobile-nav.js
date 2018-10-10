export const navTrigger = () => {
    const mobileNavClose = document.querySelector('.header__mobile-close'),
        mobileButton = document.querySelector('.header__mobile-button'),
        mobileNav = document.querySelector('.header__mobile'),
        allMobileElements = [mobileNavClose, mobileButton, mobileNav];
    
    const navClose = () => {
        allMobileElements.forEach((element) => {
            element.classList.remove('active');
        });
    };
    
    const navOpen = () => {
        allMobileElements.forEach((element) => {
            element.classList.add('active');
        })
    };
    
    if (mobileNav) {
        mobileNavClose.addEventListener('click', () => {
            navClose();
        });
        
        mobileButton.addEventListener('click', () => {
            if (mobileButton.classList.contains('active')) {
                navClose();
            } else {
                navOpen();
            }
        });
    }
};