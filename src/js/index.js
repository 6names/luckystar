import {browserDetect} from "./components/browser-detect";
import {uiIcons} from "./components/icons";
import {checkStyle} from "./components/form-elements";
import {getModal, testModal} from "./components/modals";
import {validate} from "./components/validation";
import {navTrigger} from "./components/mobile-nav";

// Window resize
window.addEventListener('resize', () => {

});

// Check if content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Detect browser and platform
    browserDetect();
    
    // Download UI icons
    uiIcons();
    
    // Mobile nav
    navTrigger();
    
    // Modals
    getModal(() => {
    
    });
    
    /*testModal('blank-modal', () => {
    
    });*/
    
    checkStyle();
});
