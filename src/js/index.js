import {browserDetect} from "./components/browser-detect";
import {uiIcons} from "./components/icons";
import {accordion, hideDropdownOnDocumentClick} from "./components/accordions";

// Check if content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Detect browser and platform
    browserDetect();
    
    // Accordions
    accordion('.header__contacts-trigger', '.header__contacts-list');
    accordion('.main__trigger', '.main__content');
    accordion('.nav__trigger', '.nav__list');
    
    // Download UI icons
    uiIcons();
});
