new Swiper(".swiper-container", {
    spaceBetween: 1,
    slidesPerView: 3,
    centeredSlides: true,
    roundLengths: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    breakpoints: {
        320: {
            slidesPerView: 2.001
        },
        991: {
            slidesPerView: 3
        }
    }
});


/* This script supports IE9+ */
(function () {
    /* Opening modal window function */
    function openModal() {
        /* Get trigger element */
        var modalTrigger = document.getElementsByClassName('jsModalTrigger');

        /* Set onclick event handler for all trigger elements */
        for (var i = 0; i < modalTrigger.length; i++) {
            modalTrigger[i].onclick = function () {
                var target = this.getAttribute('href').substr(1);
                var modalWindow = document.getElementById(target);

                modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
            }
        }
    }

    function closeModal() {
        /* Get close button */
        var closeButton = document.getElementsByClassName('jsModalClose');
        var closeOverlay = document.getElementsByClassName('jsOverlay');

        /* Set onclick event handler for close buttons */
        for (var i = 0; i < closeButton.length; i++) {
            closeButton[i].onclick = function () {
                var modalWindow = this.parentNode.parentNode;

                modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }

        /* Set onclick event handler for modal overlay */
        for (var i = 0; i < closeOverlay.length; i++) {
            closeOverlay[i].onclick = function () {
                var modalWindow = this.parentNode;

                modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        }

    }

    /* Handling domready event IE9+ */
    function ready(fn) {
        if (document.readyState != 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    /* Triggering modal window function after dom ready */
    ready(openModal);
    ready(closeModal);
}());

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

function telMask(e) {
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

function getInputNumbers(input) {
    return input.value.replace(/\D/g, "")
}

function telKeyDown(e) {
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

function telPaste(e) {
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


$(document).on('change keyup', '.required', function (e) {
    let Disabled = true;
    $(".required").each(function () {
        let value = this.value
        if ((value) && (value.trim() != '')) {
            Disabled = false
        } else {
            Disabled = true
            return false
        }
    });

    if (Disabled) {
        $('.toggle-disabled').prop("disabled", true);
    } else {
        $('.toggle-disabled').prop("disabled", false);
    }
})


$(function () {
    var button = $("button");
    var name = $("input[name=name]");

    name.keyup(function () {
        if (name.val().length > 0) {
            button.addClass('active');
        } else {
            button.removeClass('active');
        }
    });

    $("form").submit(function (event) {
        event.preventDefault();

        //get the form data
        var formData = {
            name: $("input[name=name]").val(),
            email: $("input[name=email]").val(),
            tel: $("input[name=tel]").val()
        };

        // process the form
        $.ajax({
            type: "POST",
            url: "https://jsonplaceholder.typicode.com/posts",
            data: formData,
            dataType: "json",
            encode: true
        }).done(function (data) {
            $('.form-inner').remove()
            $(".response")
            // .empty()
            // .append(JSON.stringify(data, null, 2));
            $('.response').append('<div class="sucscess"><img src="../images/content/sucscess.png" alt=""><div class="modal_title" style="text-align: center">Заявка принята!</div> <span style="font-size: 24px">И в ближайшее время мы с вами свяжемся</span></div>');
        });
    });
});

