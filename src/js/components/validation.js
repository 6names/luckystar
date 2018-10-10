// data-required="required" For required inputs
// data-error-message="message" For error message
// value="empty" For invalid select option
//
import {forLoop} from "./helpers";

export const validate = (formEl, callback) => {
    const form = document.getElementById(formEl);
    
    if (form) {
        let i;
        const inputs = form.querySelectorAll('input');
        const textareas = form.querySelectorAll('textarea');
        const selects = form.querySelectorAll('select');
        let re;
        let error;
        
        // Add error message
        const addErrorMessage = (input) => {
            const message = document.createElement('div');
            message.className = 'error-message';
            message.innerHTML = error;
            const type = input.getAttribute('type');
            
            if (type === 'checkbox' || type === 'radio') {
                if (input.parentElement.nextElementSibling == null || !input.parentElement.nextElementSibling.classList.contains('error-message')) {
                    input.parentElement.insertAdjacentElement('afterend', message);
                }
                
            } else {
                if (input.nextElementSibling == null) {
                    input.insertAdjacentElement('afterend', message);
                }
            }
        };
        
        // Remove error message
        const removeErrorMessage = (input) => {
            const message = input.nextSibling;
            const type = input.getAttribute('type');
            
            if (type === 'checkbox' || type === 'radio') {
                if (input.parentElement.nextElementSibling != null && input.parentElement.nextElementSibling.classList.contains('error-message')) {
                    input.parentElement.nextElementSibling.remove();
                }
            } else {
                if (input.nextElementSibling != null) {
                    message.remove();
                }
            }
        };
        
        const checkSelects = () => {
            forLoop(selects.length, (i) => {
                const select = selects[i];
                if (select.value === 'empty') {
                    select.classList.add('error');
                    form.classList.add('invalid');
                } else {
                    select.classList.remove('error');
                    form.classList.remove('invalid');
                }
            });
        };
        
        // Inputs
        const checkInputs = (input) => {
            if (input.dataset.required === 'required') {
                const name = input.getAttribute('name');
                const type = input.getAttribute('type');
                error = input.dataset.errorMessage;
                
                if (type === 'checkbox') {
                    if (!input.checked) {
                        input.classList.add('error');
                        form.classList.add('invalid');
                    } else {
                        input.classList.remove('error');
                        form.classList.remove('invalid');
                    }
                } else if (type === 'radio') {
                    const groupName = input.getAttribute('name');
                    const group = document.querySelectorAll(`[name=${groupName}"]`);
                    
                    for (let i = 0; i < group.length; i++) {
                        if (group[i].checked)
                            break;
                    }
                    
                    if (i === group.length) {
                        forLoop(group.length, (i) => {
                            const item = group[i];
                            item.parentElement.classList.add('error');
                            item.parentElement.parentElement.classList.add('error');
                            form.classList.add('invalid');
                        });
                    } else {
                        forLoop(group.length, (i) => {
                            const item = group[i];
                            item.parentElement.classList.remove('error');
                            item.parentElement.parentElement.classList.remove('error');
                            form.classList.remove('invalid');
                        });
                    }
                } else {
                    if (name) {
                        const randomInput = () => {
                            if (input.value === '') {
                                input.classList.add('error');
                                form.classList.add('invalid');
                                if (error) {
                                    addErrorMessage(input);
                                }
                            } else {
                                input.classList.remove('error');
                                form.classList.remove('invalid');
                                removeErrorMessage(input);
                            }
                        };
                        
                        const patternInput = () => {
                            if (!re.test(input.value)) {
                                input.classList.add('error');
                                form.classList.add('invalid');
                                if (error) {
                                    addErrorMessage(input);
                                }
                            } else {
                                input.classList.remove('error');
                                form.classList.remove('invalid');
                                removeErrorMessage(input);
                            }
                        };
                        
                        switch (name) {
                            case 'name':
                                re = /^[a-zA-Zа-яА-Я]{3,20}$/;
                                patternInput();
                                break;
                            case 'firstName':
                                re = /^[a-zA-Zа-яА-Я]{3,20}$/;
                                patternInput();
                                break;
                            case 'lastName':
                                re = /^[a-zA-Zа-яА-Я]{3,20}$/;
                                patternInput();
                                break;
                            case 'thirdName':
                                re = /^[a-zA-Zа-яА-Я]{3,20}$/;
                                patternInput();
                                break;
                            case 'email':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'mail':
                                re = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/;
                                patternInput();
                                break;
                            case 'phone':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            case 'tel':
                                re = /^(\+7|\+8|7|8|\+3|3)+\d?\(?\d{3}\)?\d{3}-?\d{2}-?\d{2}$/;
                                patternInput();
                                break;
                            
                            default:
                                randomInput();
                        }
                    }
                }
            }
        };
        
        // Selects
        forLoop(selects.length, (i) => {
            const select = selects[i];
            select.addEventListener('change', () => {
                if (select.value === 'empty') {
                    select.classList.add('error');
                    form.classList.add('invalid');
                } else {
                    select.classList.remove('error');
                    form.classList.remove('invalid');
                }
            });
        });
        
        // Inputs listeners
        forLoop(inputs.length, (i) => {
            const type = inputs[i].getAttribute('type');
            const input = inputs[i];
            if (type === 'checkbox' || type === 'radio') {
                input.addEventListener('change', function () {
                    checkInputs(this);
                });
            } else {
                input.addEventListener('blur', function () {
                    checkInputs(this);
                });
                input.addEventListener('keyup', function () {
                    checkInputs(this);
                });
            }
        });
        
        // Textarea
        forLoop(textareas.length, (i) => {
            const textarea = textareas[i];
            textarea.addEventListener('blur', function () {
                checkInputs(this);
            });
        });
        
        // Submit listener
        form.addEventListener('submit', function (e) {
            forLoop(inputs.length, (i) => {
                checkInputs(inputs[i]);
            });
    
            forLoop(textareas.length, (i) => {
                checkInputs(textareas[i]);
            });
            
            checkSelects();
            
            if (form.querySelectorAll('.error').length > 0) {
                e.preventDefault();
            } else {
                if (callback) {
                    callback(e);
                }
            }
        });
    }
};
