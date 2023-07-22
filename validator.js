//Đối tượng Validator
function Validator (options) {

    //Lấy element của form cần validate
    var formElement = document.querySelector(options.form);

    //Hàm thực hiện Validate
    function validate (inputElement, rule) {
        
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
        var errorMessage = rule.test(inputElement.value);

        if(errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }

    if(formElement) {

        options.rules.forEach((rule) => {
            var inputElement = formElement.querySelector(rule.selector);

            console.log(inputElement);

            if (inputElement) {
                //xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    // value : inputElement.value
                    // test function : rule.test
                    validate(inputElement, rule);
                };
            }
            //xử lý mỗi khi người dùng nhập vào input
            inputElement.oninput = function () {
                var errorElement = inputElement.parentElement.querySelector('.form-message');
                errorElement.innerText = '';
                inputElement.parentElement.classList.remove('invalid');
            };
        });
    }
}

// Định nghĩa
// Nguyên tắc của các rules:
// 1. Khi có lỗi => trả ra message lỗi 
// 2. Khi hợp lệ => Không trả ra gì (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || "Vui lòng nhập trường này";
        }
    }
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || "Trường này phải nhập Email ";
        }
    }
}
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    }
}
Validator.isConfirmed = function () {
    
}
// Validator.isConfirmed = function (selector, getConfirmValue){
//     return {
//         selector: selector,
//         test: function (value) {
//             return value === getConfirmValue() ? undefined : 'Vui lòng nhập lại mật khẩu chính xác'
//         }
//     }
// }