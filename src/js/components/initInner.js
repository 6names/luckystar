import {checkStyle} from "./form-elements";
import {getModal, modalHolder} from "./modals";

// Init modal inner functions
export const initInner = () => {
    // form elements styling
    checkStyle(modalHolder);
    
    // modals inside dynamic content
    getModal();
    
    // validations
    
};