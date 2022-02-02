import axios from "axios";

function validateCardNumber(value) {
    if (value.length === 0) {
        return 'Card number is required';
    }

    if (value.length > 16) {
        return 'Card number is too long';
    }

    if (!value.match(/^[0-9]+$/)) {
        return 'Card number must contain digits only';
    }

    if (value.length === 16 && !luhn_validate(value)) {
        return 'Card number is not valid';
    }

    return false;
}

export function detect() {
    return !!document.getElementById('cardForm');
}

export async function initialize() {
    let bankPrefixesToNames = {};

    try {
        const response = await axios.get('/issuers/all');

        bankPrefixesToNames = response.data.reduce(function (dict, issuer) {
            dict[issuer.prefix] = issuer.name;
            return dict;
        }, {});
    } catch (e) {
        // TODO: should display an error message
    }

    const cardFormElem = document.getElementById('cardForm');
    const cardNumberElem = document.getElementById('cardNumber');
    const cardNumberInvalidFeedbackElem = document.getElementById('cardNumberInvalidFeedback');
    const bankNameElem = document.getElementById('bankName');
    const cardExpiresElem = document.getElementById('cardExpires');
    const cardExpiresInvalidFeedbackElem = document.getElementById('cardExpiresInvalidFeedback');
    const securityCodeElem = document.getElementById('securityCode');
    const securityCodeInvalidFeedbackElem = document.getElementById('securityCodeInvalidFeedback');
    const cardholderNameElem = document.getElementById('cardholderName');
    const cardholderNameInvalidFeedbackElem = document.getElementById('cardholderNameInvalidFeedback');

    function validateCardNumberInput() {
        let value = cardNumberElem.value;
        let bankName;
        let errorMessage = validateCardNumber(value);

        if (value.length >= 4) {
            bankName = bankPrefixesToNames[value.substr(0, 4)];

            if (!errorMessage && !bankName) {
                errorMessage = 'Card issuer is not accepted';
            }
        }

        bankNameElem.innerText = bankName || '';

        if (!errorMessage && value.length !== 16 && document.activeElement !== cardNumberElem) {
            errorMessage = 'Card number is not valid';
        }

        if (errorMessage !== false) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }

        cardNumberInvalidFeedbackElem.innerText = errorMessage || '';
    }

    function controlCardNumberInput(ev) {
        // allow digits only
        if (ev.which < 48 || ev.which > 57) {
            ev.preventDefault();
            return;
        }
    }

    function validateCardExpiresInput() {
        let value = cardExpiresElem.value;
        let errorMessage = false;

        if (value.length === 0) {
            errorMessage = 'Expiration date is required';
        } else if (value.length === 5 && !value.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
            errorMessage = 'Expiration date is not valid';
        } else if (value.length !== 5 && document.activeElement !== cardExpiresElem) {
            errorMessage = 'Expiration date is not valid';
        }

        if (errorMessage !== false) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }

        cardExpiresInvalidFeedbackElem.innerText = errorMessage || '';
    }

    function controlCardExpiresInput(ev) {
        // allow digits only
        if (ev.which < 48 || ev.which > 57) {
            ev.preventDefault();
            return;
        }

        let value = this.value;
        const c = String.fromCharCode(ev.which);

        if (value.length === 0 && c !== '0' && c !== '1') {
            ev.preventDefault();
            this.value = '0' + c + '/';
        } else if (value.length === 1) {
            ev.preventDefault();
            this.value = value + c + '/';
        }
    }

    function validateSecurityCodeInput() {
        let value = this.value;
        let errorMessage = false;

        if (value.length === 0) {
            errorMessage = 'Security code is required';
        } else if (value.length === 3 && !value.match(/^[0-9]{3}$/)) {
            errorMessage = 'Security code is not valid';
        } else if (value.length !== 3 && document.activeElement !== this) {
            errorMessage = 'Security code is not valid';
        }

        if (errorMessage !== false) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }

        securityCodeInvalidFeedbackElem.innerText = errorMessage || '';
    }

    function controlSecurityCodeInput(ev) {
        // allow digits only
        if (ev.which < 48 || ev.which > 57) {
            ev.preventDefault();
            return;
        }
    }

    function validateCardholderNameInput() {
        let value = this.value;
        let errorMessage = false;

        if (value.length === 0) {
            errorMessage = 'Name on card is required';
        } else if (value.length < 2 || value.length > 26 || !value.match(/^[A-Z]+([ ][A-Z]+)*[A-Z]*$/i)) {
            if (document.activeElement !== this) {
                errorMessage = 'Name on card is not valid';
            }
        }

        if (errorMessage !== false) {
            this.classList.add('is-invalid');
        } else {
            this.classList.remove('is-invalid');
        }

        cardholderNameInvalidFeedbackElem.innerText = errorMessage || '';
    }

    function controlCardholderNameInput(ev) {
        // allow space and alphabet letters
        if (ev.which !== 32 && !(ev.which >= 65 && ev.which <= 90) && !(ev.which >= 97 && ev.which <= 122)) {
            ev.preventDefault();
            return;
        }
    }

    cardNumberElem.addEventListener('input', validateCardNumberInput);
    cardNumberElem.addEventListener('blur', validateCardNumberInput);
    cardNumberElem.addEventListener('keypress', controlCardNumberInput);

    cardExpiresElem.addEventListener('input', validateCardExpiresInput);
    cardExpiresElem.addEventListener('blur', validateCardExpiresInput);
    cardExpiresElem.addEventListener('keypress', controlCardExpiresInput);

    securityCodeElem.addEventListener('input', validateSecurityCodeInput);
    securityCodeElem.addEventListener('blur', validateSecurityCodeInput);
    securityCodeElem.addEventListener('keypress', controlSecurityCodeInput);

    cardholderNameElem.addEventListener('input', validateCardholderNameInput);
    cardholderNameElem.addEventListener('blur', validateCardholderNameInput);
    cardholderNameElem.addEventListener('keypress', controlCardholderNameInput);

    cardFormElem.addEventListener('submit', async function (ev) {
        ev.preventDefault();

        for (const input of this.querySelectorAll('input')) {
            input.focus();
            input.blur();
        }

        if (this.querySelector('.is-invalid')) {
            return;
        }

        try {
            const response = await axios.post('/cards', {
                card_number: cardNumberElem.value,
                expiration_month: cardExpiresElem.value.split('/')[0],
                expiration_year: cardExpiresElem.value.split('/')[1],
                security_code: securityCodeElem.value,
                cardholder_name: cardholderNameElem.value.toUpperCase(),
            });
            const cardNotificationElem = document.getElementById('cardNotification');

            cardNotificationElem.innerText = 'Card registered successfully.';
            cardNotificationElem.classList.remove('d-none');
            cardFormElem.classList.add('d-none');
        } catch (e) {
            if (e.response.status === 422) {
                const errors = e.response.data.errors;

                if (errors.card_number) {
                    cardNumberElem.classList.add('is-invalid');
                    cardNumberInvalidFeedbackElem.innerText = errors.card_number[0] || '';
                }
            }
        }
    });
}

/* luhn_checksum
* Implement the Luhn algorithm to calculate the Luhn check digit.
* Return the check digit.
*/
function luhn_checksum(code) {
    const len = code.length;
    const parity = len % 2;
    let sum = 0;

    for (let i = len - 1; i >= 0; i--) {
        let d = parseInt(code.charAt(i), 10);

        if (i % 2 == parity) {
            d *= 2;
        }

        if (d > 9) {
            d -= 9;
        }

        sum += d;
    }

    return sum % 10;
}

/* luhn_calculate
* Return a full code (including check digit), from the specified partial code (without check digit).
*/
function luhn_calculate(partcode) {
    const checksum = luhn_checksum(partcode + '0');
    return checksum === 0 ? 0 : 10 - checksum;
}

/* luhn_validate
* Return true if specified code (with check digit) is valid.
*/
function luhn_validate(fullcode) {
    return luhn_checksum(fullcode) == 0;
}
