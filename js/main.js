document.addEventListener('DOMContentLoaded', initSwiper);
/* This script supports IE9+ */
(() => {
    /* Opening modal window function */
    const openModal = () => {
        /* Get trigger element */
        const modalTrigger = document.getElementsByClassName('jsModalTrigger');
        /* Set onclick event handler for all trigger elements */
        for (let i = 0; i < modalTrigger.length; i++) {
            modalTrigger[i].onclick = function() {
                const target = this.getAttribute('href').substr(1);
                const modalWindow = document.getElementById(target);
                modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
            }
        }
    };
    const closeModal = () => {
        /* Get close button */
        const closeButton = document.getElementsByClassName('jsModalClose');
        const closeOverlay = document.getElementsByClassName('jsOverlay');
        /* Set onclick event handler for close buttons */
        for (let i = 0; i < closeButton.length; i++) {
            closeButton[i].onclick = function() {
                const modalWindow = this.parentNode.parentNode;
                modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
        /* Set onclick event handler for modal overlay */
        for (let i = 0; i < closeOverlay.length; i++) {
            closeOverlay[i].onclick = function() {
                const modalWindow = this.parentNode;
                modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }
    };
    /* Handling domready event IE9+ */
    const ready = (fn) => {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    };
    /* Triggering modal window function after dom ready */
    ready(openModal);
    ready(closeModal);
})();
let phoneInput = document.querySelectorAll('input[type="tel"]');
phoneInput.forEach(input => {
    input.addEventListener('input', telMask);
    input.addEventListener("keydown", telKeyDown);
    input.addEventListener('paste', telPaste);
    input.addEventListener('focus', telFocus);
    input.addEventListener('blur', telBlur);
})
let defaultPlaceholder;
function telFocus() {
    defaultPlaceholder = this.placeholder;
    if (this.value.length < 1) {
        this.placeholder = "+7(___)-___-__-__";
    }
}
function telBlur() {
    this.placeholder = defaultPlaceholder;
}
let numberType;
const telMask = (e) => {
    let inpNumValue = getInputNumbers(this);
    let formatedInputValue = "";
    let selectionStart = this.selectionStart;
    if (this.value.length !== selectionStart) {
        if (e.data && /\D/g.test(e.data)) {
            this.value = inpNumValue;
        }
        return;
    }
    if (!inpNumValue) {
        return this.value = "";
    }
    if (["7", "8", "9"].indexOf(inpNumValue[0]) > -1) {
        //russian number
        numberType = "russian";
        if (inpNumValue[0] == "9") {
            inpNumValue += inpNumValue;
        }
        let firstSymbols = (inpNumValue[0] == "8") ? "+8" : "+7";
        formatedInputValue = firstSymbols + " (";
        if (formatedInputValue.length > 1) {
            formatedInputValue += inpNumValue.substring(1, 4);
        }
        if (inpNumValue.length >= 5) {
            formatedInputValue += ") " + inpNumValue.substring(4, 7);
        }
        if (inpNumValue.length >= 8) {
            formatedInputValue += "-" + inpNumValue.substring(7, 9);
        }
        if (inpNumValue.length >= 10) {
            formatedInputValue += "-" + inpNumValue.substring(9, 11);
        }
    } else {
        //not russian number
        numberType = "foreign";
        formatedInputValue = "";
    }
    this.value = formatedInputValue;
}
const getInputNumbers = (input) => input.value.replace(/\D/g, "");
const telKeyDown = (e) => {
    if (numberType == "russian") {
        let selectionStart = this.selectionStart;
        let selectionEnd = this.selectionEnd;
        if (e.keyCode !== 8 && e.keyCode !== 46 && this.value.length >= 18 && e.keyCode !== 37 && e.keyCode !== 39 && selectionStart == selectionEnd) {
            this.selectionStart = this.value.length;
        }
        if ((e.keyCode == 8) && (selectionStart == 8 || selectionStart == 4) && (getInputNumbers(this).length !== 1) && (selectionStart == selectionEnd)) {
            this.value += "0";
            this.selectionStart = this.value.length;
        }
        if ((e.keyCode == 46) && (selectionStart == 7 || selectionStart == 3)) {
            this.selectionStart = this.value.length;
        }
        if (e.keyCode == 8 && getInputNumbers(this).length == 1) {
            this.value = ""
        }
    }
}
const telPaste = (e) => {
    if (numberType == "russian") {
        let pasted = e.clipboardData || window.clipboardData;
        inpNumValue = getInputNumbers(this);
        if (pasted) {
            let pastedText = pasted.getData("text");
            if ((/\D/g.test(pastedText)) || this.value.length >= 18 && !(this.selectionEnd - this.selectionStart >= pastedText.length)) {
                this.selectionStart = this.value.length;
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const requiredFields = document.querySelectorAll('.required');
    const submitButton = document.querySelector('.toggle-disabled');
    const checkRequiredFields = () => {
        const isDisabled = Array.from(requiredFields).some(field => !field.value.trim());
        submitButton.disabled = isDisabled;
    };
    requiredFields.forEach(field => {
        field.addEventListener('change', checkRequiredFields);
        field.addEventListener('keyup', checkRequiredFields);
    });
    checkRequiredFields(); // Initial check on page load
});
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector("button");
    const nameInput = document.querySelector("input[name=name]");
    nameInput.addEventListener('keyup', () => {
        button.classList.toggle('active', nameInput.value.length > 0);
    });
    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        //get the form data
        const formData = {
            name: form.querySelector("input[name=name]").value,
            email: form.querySelector("input[name=email]").value,
            tel: form.querySelector("input[name=tel]").value
        };
        // process the form
        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            const formInner = document.querySelector('.form-inner');
            if (formInner) {
                formInner.remove();
            }
            const responseDiv = document.querySelector('.response');
            responseDiv.innerHTML = '<div class="sucscess"><img src="../images/content/sucscess.png" alt=""><div class="modal_title" style="text-align: center">Заявка принята!</div> <span style="font-size: 24px">И в ближайшее время мы с вами свяжемся</span></div>';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});
