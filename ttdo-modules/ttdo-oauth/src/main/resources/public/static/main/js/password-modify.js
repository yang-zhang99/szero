function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

$(document).ready(function () {
    if (typeof Object.assign != 'function') {
        Object.assign = function (target) {
            'use strict';
            if (target == null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            target = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }
    var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    var globalData = {};
    var $templateData = $('#templateData');
    globalData.loginUrl = $templateData.data('loginurl') || '/oauth/static/main/img/logo.svg';
    globalData.optionSucceeded = $templateData.data('optionsucceeded');
    globalData.optionFailed = $templateData.data('optionfailed');
    globalData.resetPassword = $templateData.data('resetpassword');
    globalData.complete = $templateData.data('complete');
    globalData.validateAccountErr = $templateData.data('validateaccounterr');
    globalData.validateAccountFailed = $templateData.data('validateaccountfailed');
    globalData.userNameNotNull = $templateData.data('usernamenotnull');
    globalData.findAccount = $templateData.data('findaccount');
    globalData.captchaPlaceholder = $templateData.data('captchaplaceholder');
    globalData.captchaMessage = $templateData.data('captchamessage');
    globalData.cancel = $templateData.data('cancel');
    globalData.nextStep = $templateData.data('nextstep');
    globalData.preStep = $templateData.data('prestep');
    globalData.validatePwdRepeat = $templateData.data('validatepwdrepeat');
    globalData.captchaLoadErrgMsg = $templateData.data('captchaloaderrgmsg');
    globalData.getCaptcha = $templateData.data('getcaptcha');
    globalData.newPwdCanNotNul = $templateData.data('newpwdcannotnul');
    globalData.resetPwdErr = $templateData.data('resetpwderr');
    globalData.resetPwd = $templateData.data('resetpwd');
    globalData.pwdRepeatMsg = $templateData.data('pwdrepeatmsg');
    globalData.resetPwdSucceeded = $templateData.data('resetpwdsucceeded');
    globalData.loadingNow = $templateData.data('loadingnow');
    globalData.pwdRepeat = $templateData.data('pwdrepeat');
    globalData.copyright = $templateData.data('copyright') || 'Copyright ?? The HZERO Author??.All rights reserved.';
    globalData.publicKey = $templateData.data('publickey'); //  ??????????????????
    globalData.organizationId = $templateData.data('orgid'); //  ??????????????????



    var message = {
        success: function success(config) {
            notification(Object.assign({
                placement: 'bottomRight',
                duration: 2,
                message: globalData.optionSucceeded,
                type: 'success',
            }, config));
        },
        error: function error(config) {
            notification(Object.assign({
                placement: 'bottomRight',
                duration: 2,
                message: globalData.optionFailed,
                type: 'error',
            }, config));
        }
    };

    function notification(params) {
        var message = params.message,
            duration = params.duration,
            type = params.type;
        var node = document.createElement("div");
        node.innerHTML = "<div class=\"password-alert\" role=\"alert\">\n    <span class=\"glyphicon ".concat(type == "success" ? 'glyphicon-ok' : 'glyphicon-exclamation-sign', "  password-notification-").concat(type, "\"></span>\n    <div class=\"password-notification-content\">").concat(message, "</div>\n    <span class=\"glyphicon glyphicon-remove\"></span>\n  </div>");
        $(".password-notification").append(node);
        setTimeout(function () {
            try {
                node.remove(node)
            } catch (err) {
                // ??????ie									               
                node.removeNode(true);
            }
        }, duration * 1000);
    }

    $(document).on("click", ".password-alert .glyphicon-remove", function (e) {
        try {
            e.target.parentNode.remove();
        } catch (err) {
            // ??????ie	
            e.target.parentNode.removeNode(true);
        }
    });




    $('.btn-raised').click(function (e) {
        var _this = $(this);

        var px = e.offsetX;
        var py = e.offsetY - 37;
        var id = parseInt(Math.random() * 1000);

        _this.append('<div class="water-btn-style" style="top:' + py + 'px;left:' + px + 'px;background:rgba(0, 0, 0, 0.14)' + '" id="wb_' + id + '"></div>');

        setTimeout(function () {
            try {
                _this.find('#wb_' + id).remove();
            } catch (err) {
                // ??????ie	
                _this.find('#wb_' + id).removeNode(true);
            }
        }, 1000);
    });

    function validate(selector, form) {
        var flag = $(form).validate().element($(selector));

        if (flag) {
            $(selector).parents(".password-input-content").removeClass("has-error");
        } else {
            $(selector).parents(".password-input-content").addClass("has-error");
        }

        return flag;
    }

    function setLocalStorage(key, value) {
        localStorage.setItem('oauth-password_modify' + key, JSON.stringify(value));
    }

    function getLocalStorage(key) {
        var value = localStorage.getItem('oauth-password_modify' + key);
        return value ? JSON.parse(value) : undefined;
    }

    function passwordValidate() {
        var _ref = getLocalStorage('passwordTipMsg') || {},
            digitsCount = _ref.digitsCount,
            lowercaseCount = _ref.lowercaseCount,
            maxLength = _ref.maxLength,
            minLength = _ref.minLength,
            notUsername = _ref.notUsername,
            specialCharCount = _ref.specialCharCount,
            uppercaseCount = _ref.uppercaseCount;

        var msg = '';
        var allFlag = false;
        var value = $("#password").val();
        var loginName = getLocalStorage('loginName');
        var node = document.createElement("div"); // node.className = "password-validate"

        if (minLength && maxLength) {
            var flag = value.length < minLength || value.length > maxLength;
            allFlag = !flag;

            if (!flag) {
                msg += "<div class='password-validate-item' style=\"color: #52c41a\">\n        <i class=\"glyphicon glyphicon-ok\"></i>\n        <span>".concat(minLength, "-").concat(maxLength, " ").concat(storeData.initData.validateLength, "</span>\n      </div>");
            } else {
                msg += "<div class='password-validate-item' style=\"color: #f5222d\">\n        <i class=\"glyphicon glyphicon-remove\"></i>\n        <span>".concat(minLength, "-").concat(maxLength, " ").concat(storeData.initData.validateLength, "</span>\n      </div>");
            }
        }

        if (lowercaseCount) {
            var regStr = [];

            for (var i = 0; i < lowercaseCount; i++) {
                regStr.push('([a-z].*)');
            }

            var lower = new RegExp("".concat(regStr.join('')));

            var _flag = lower.test(value);

            allFlag = _flag && allFlag;

            if (_flag) {
                msg += "<div class='password-validate-item' style=\"color: #52c41a\">\n        <i class=\"glyphicon glyphicon-ok\"></i>\n        <span>".concat(storeData.initData.atLeast, " ").concat(lowercaseCount, " ").concat(storeData.initData.validateLower, "</span>\n      </div>");
            } else {
                msg += "<div class='password-validate-item' style=\"color: #f5222d\">\n        <i class=\"glyphicon glyphicon-remove\"></i>\n        <span>".concat(storeData.initData.atLeast, " ").concat(lowercaseCount, " ").concat(storeData.initData.validateLower, "</span>\n      </div>");
            }
        }

        if (uppercaseCount) {
            var _regStr = [];

            for (var _i = 0; _i < uppercaseCount; _i++) {
                _regStr.push('([A-Z].*)');
            }

            var upper = new RegExp("".concat(_regStr.join('')));

            var _flag2 = upper.test(value);

            allFlag = _flag2 && allFlag;

            if (_flag2) {
                msg += "<div class='password-validate-item' style=\"color: #52c41a\">\n        <i class=\"glyphicon glyphicon-ok\"></i>\n        <span>".concat(storeData.initData.atLeast, " ").concat(uppercaseCount, " ").concat(storeData.initData.validateUpper, "</span>\n      </div>");
            } else {
                msg += "<div class='password-validate-item' style=\"color: #f5222d\">\n        <i class=\"glyphicon glyphicon-remove\"></i>\n        <span>".concat(storeData.initData.atLeast, " ").concat(uppercaseCount, " ").concat(storeData.initData.validateUpper, "</span>\n      </div>");
            }
        }

        if (notUsername === false) {
            var _flag3 = value === loginName;

            allFlag = !_flag3 && allFlag;

            if (!_flag3) {
                msg += "<div class='password-validate-item' style=\"color: #52c41a\">\n        <i class=\"glyphicon glyphicon-ok\"></i>\n        <span>".concat(storeData.initData.validateUserName, "</span>\n      </div>");
            } else {
                msg += "<div class='password-validate-item' style=\"color: #f5222d\">\n        <i class=\"glyphicon glyphicon-remove\"></i>\n        <span>".concat(storeData.initData.validateUserName, "</span>\n      </div>");
            }
        }

        if (digitsCount) {
            var _regStr2 = [];

            for (var _i2 = 0; _i2 < digitsCount; _i2++) {
                _regStr2.push('([0-9].*)');
            }

            var digits = new RegExp("".concat(_regStr2.join('')));

            var _flag4 = digits.test(value);

            allFlag = _flag4 && allFlag;

            if (_flag4) {
                msg += "<div class='password-validate-item' style=\"color: #52c41a\">\n        <i class=\"glyphicon glyphicon-ok\"></i>\n        <span>".concat(storeData.initData.atLeast, " ").concat(digitsCount, " ").concat(storeData.initData.validateDigit, "</span>\n      </div>");
            } else {
                msg += "<div class='password-validate-item' style=\"color: #f5222d\">\n        <i class=\"glyphicon glyphicon-remove\"></i>\n        <span>".concat(storeData.initData.atLeast, " ").concat(digitsCount, " ").concat(storeData.initData.validateDigit, "</span>\n      </div>");
            }
        }

        if (specialCharCount) {
            var _regStr3 = [];

            for (var _i3 = 0; _i3 < specialCharCount; _i3++) {
                _regStr3.push('([~`@#$%^&*/\\-_=+|/()<>,.;:!].*)');
            }

            var special = new RegExp("".concat(_regStr3.join('')));

            var _flag5 = special.test(value);

            allFlag = _flag5 && allFlag;

            if (_flag5) {
                msg += "<div class='password-validate-item' style=\"color: #52c41a\">\n        <i class=\"glyphicon glyphicon-ok\"></i>\n        <span>".concat(storeData.initData.atLeast, " ").concat(specialCharCount, " ").concat(storeData.initData.validateSpecial, "</span>\n      </div>");
            } else {
                msg += "<div class='password-validate-item' style=\"color: #f5222d\">\n        <i class=\"glyphicon glyphicon-remove\"></i>\n        <span>".concat(storeData.initData.atLeast, " ").concat(specialCharCount, " ").concat(storeData.initData.validateSpecial, "</span>\n      </div>");
            }
        }

        if (msg.length == 0 && !allFlag) {
            allFlag = true;
        }

        if (msg.length > 0 && !allFlag && value) {
            node.innerHTML = msg;
            $('.password-validate').html(node);
            $('.password-validate').addClass("password-validate-active");
        } else {
            $('.password-validate').html("<div></div>");
            $('.password-validate').removeClass("password-validate-active");
        }

        return allFlag;
    }

    function encryptMd5(password) {
        var output = "";
        var chr1,
            chr2,
            chr3 = "";
        var enc1,
            enc2,
            enc3,
            enc4 = "";
        var i = 0;

        do {
            chr1 = password.charCodeAt(i++);
            chr2 = password.charCodeAt(i++);
            chr3 = password.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = (chr1 & 3) << 4 | chr2 >> 4;
            enc3 = (chr2 & 15) << 2 | chr3 >> 6;
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
            chr1 = chr2 = chr3 = "";
            enc1 = enc2 = enc3 = enc4 = "";
        } while (i < password.length);

        return output;
    }

    function encryptPwd(password) {
        /* ????????? ?????? rsa ??????, ???????????? md5 ?????? */
        if (globalData.publicKey) {
            // ??????????????????
            var encrypt = new JSEncrypt(); // ????????????

            encrypt.setPublicKey(globalData.publicKey); // ??????

            return encrypt.encrypt(password);
        } else {
            return encryptMd5(password);
        }
    }

    function Throttle() {
        var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 200;
        var calling = false;
        var context;
        var args;
        var fn;

        function invokeSuccess() {
            calling = false;
        }

        return function (_fn) {
            fn = _fn;
            return function () {
                if (calling) {
                    return;
                }

                calling = true;
                context = this;
                args = Array.prototype.slice.call(arguments);
                fn.apply(context, args);
                setTimeout(invokeSuccess, time);
            };
        };
    }





    function initValidate() {
        jQuery.validator.addMethod("isSame", function (value) {
            return value == $('#password').val();
        }, globalData.validatePwdRepeat);
        $('#formResetPassword').validate({
            errorPlacement: function errorPlacement(error, element) {
                error.addClass("has-error has-error-msg");
                error.appendTo(element.parent());
            },
            onkeyup: false,
            onclick: false,
            onfocusout: false,
            onsubmit: false,
            rules: {
                password: "required",
                passwordRepeat: {
                    required: true,
                    isSame: true
                }
            },
            messages: {
                passwordRepeat: {
                    required: globalData.pwdRepeatMsg
                },
                password: globalData.newPwdCanNotNul,
            }
        });

        $('#formConfirmAccount').validate({
            errorPlacement: function errorPlacement(error, element) {
                error.addClass("has-error has-error-msg");
                error.appendTo(element.parent());
            },
            onkeyup: false,
            onclick: false,
            onfocusout: false,
            onsubmit: false,
            rules: {
                account: {
                    required: true,
                    isAccount: true
                },
                captcha: "required"
            },
            messages: {
                account: {
                    required: globalData.userNameNotNull
                },
                captcha: globalData.captchaMessage
            }
        });
    } // ?????? ????????????????????????????????????, ??? babel ????????? class ?????????, ??????state????????????


    var storeData = {
        initData: {},
        // ?????????
        rootEl: null,
        // ???????????????
        password: {
            steps: [{
                title: globalData.resetPassword
            }, {
                title: globalData.complete
            }],
            currentStep: 0
        } // ????????????

    };






    $('#password').keyup(function () {
        if ($('#passwordRepeat').val()) {
            validate('#passwordRepeat', '#formResetPassword');
        }

        passwordValidate();
        var flag = validate('#password', '#formResetPassword');

        if (flag) {
            $(".look:first").css('display', 'block');
        } else {
            $(".look:first").css('display', 'none');
        }
    });
    $('#passwordRepeat').keyup(function () {
        validate('#passwordRepeat', '#formResetPassword');
        var flag = $('#passwordRepeat').val();

        if (flag) {
            $(".look:last").css('display', 'block');
        } else {
            $(".look:last").css('display', 'none');
        }
    });

    function toggleLook(selector) {
        $(selector).toggleClass("glyphicon-eye-open");
        $(selector).toggleClass("glyphicon-eye-close");
    }

    $(".look:first").mousedown(function () {
        $('#password').attr("type", "text");
        toggleLook(".look:first");
    });
    $(".look:first").mouseup(function () {
        $('#password').attr("type", "password");
        toggleLook(".look:first");
    });
    $(".look:first").mouseout(function () {
        if ($(".look:first").hasClass("glyphicon-eye-open")) {
            $('#password').attr("type", "password");
            toggleLook(".look:first");
        }
    });
    $(".look:last").mousedown(function () {
        $('#passwordRepeat').attr("type", "text");
        $(".look:last").toggleClass("glyphicon-eye-open");
    });
    $(".look:last").mouseup(function () {
        $('#passwordRepeat').attr("type", "password");
        $(".look:last").toggleClass("glyphicon-eye-open");
    });
    $(".look:last").mouseout(function () {
        if ($(".look:last").hasClass("glyphicon-eye-open")) {
            $('#passwordRepeat').attr("type", "password");
            $(".look:last").toggleClass("glyphicon-eye-open");
        }
    });

    $("#formResetPassword").submit(function (e) {
        return false;
    });
    $("#resetPasswordSuccess").submit(function (e) {
        return false;
    });

    $(".password-btn-confirm-account").click(function (e) {
        var flag = $("#formResetPassword").valid();
        var allFlag = passwordValidate();
        validate('#password', '#formResetPassword');
        validate('#passwordRepeat', '#formResetPassword');

        if (flag && allFlag) {
            resetPassword();
        }
    });

    $(".button-login").click(function () {
        backLoginPage();
    });
    /**
     * ????????? App ??????
     */

    function initInitialData() {
        // storeData.initData.logoSrc = '/oauth/static/main/img/logo.svg'; // logo ??????
        storeData.initData.successImgSrc = '/oauth/static/main/img/illustrate_success.png'; // ??????????????????



        var params = location.search.substr(1).split('&').reduce(function (prev, cur) {
            var _cur$split = cur.split('='),
                _cur$split2 = _slicedToArray(_cur$split, 2),
                name = _cur$split2[0],
                value = _cur$split2[1];

            prev[decodeURIComponent(name)] = decodeURIComponent(value);
            return prev;
        }, {});
        Object.assign(storeData.password, params); // ????????????????????????
        storeData.password.currentStep = +storeData.password.currentStep || 0;
    }

    function initQuery() {
        if (storeData.password.currentStep == 0) {
            if (!globalData.organizationId && globalData.organizationId != 0) {
                backLoginPage()
            } else {
                $.ajax({
                    url: "http://hzeronb.saas.hand-china.com/iam/v1/".concat(globalData.organizationId, "/password-policies/query"),
                    type: 'get',
                    success: function success(data) {
                        if (data.failed == true) {
                            message.error({
                                message: data.message
                            });

                        } else {
                            setLocalStorage('passwordTipMsg', data);
                        }
                    },
                    error: function error() { }
                });
            }
        }
    }


    /**
     * ?????????????????????state
     * @param {Object} patchState
     */

    function updatePassword(patchState) {
        var password = storeData.password;
        var newPassword = Object.assign({}, password, patchState);
        storeData.password = newPassword;
    }


    /**
     * ?????????????????????
     */

    function backLoginPage() {
        window.location.href = storeData.initData.loginUrl + location.search.replace('?', "&");
    }




    /**
     * ????????????
     * @param {Object} form
     * @param {String} captchaKey
     */


    function resetPassword() {
        var t = $("#formResetPassword").serializeArray();
        var d = {};
        $.each(t, function () {
            d[this.name] = this.value;
        });
        var password = d.password,
            captcha = d.passwordCaptcha;
        var captchaKey = storeData.password.captchaKey;
        var newPassword = encryptPwd($.trim(password));
        $.ajax({
            url: '/oauth/password/force-modify',
            type: 'POST',
            dataType: 'json',
            data: {
                password: newPassword,
            },
            success: function success(data) {
                if (data.success) {
                    window.location.href = '/oauth/public/main/password_modify.html?currentStep=1';
                } else {
                    switch (data.code) {
                        default:
                            message.error({
                                message: data.msg || data.message
                            });
                            break;
                    }
                }
            },
            error: function error(err) {
                message.error({
                    message: globalData.optionFailed
                });
            }
        });
    }
    /**
     * ?????????????????? ?????? render ????????????
     */


    $(function () {
        var data = {};
        var $templateData = $('#templateData');
        data.loginUrl = $templateData.data('loginurl');
        data.optionSucceeded = $templateData.data('optionsucceeded');
        data.optionFailed = $templateData.data('optionfailed');
        data.resetPassword = $templateData.data('resetpassword');
        data.complete = $templateData.data('complete');
        data.validateAccountErr = $templateData.data('validateaccounterr');
        data.validateAccountFailed = $templateData.data('validateaccountfailed');
        data.userNameNotNull = $templateData.data('usernamenotnull');
        data.findAccount = $templateData.data('findaccount');
        data.captchaPlaceholder = $templateData.data('captchaplaceholder');
        data.captchaMessage = $templateData.data('captchamessage');
        data.cancel = $templateData.data('cancel');
        data.nextStep = $templateData.data('nextstep');
        data.preStep = $templateData.data('prestep');
        data.validatePwdRepeat = $templateData.data('validatepwdrepeat');
        data.captchaLoadErrgMsg = $templateData.data('captchaloaderrgmsg');
        data.getCaptcha = $templateData.data('getcaptcha');
        data.newPwdCanNotNul = $templateData.data('newpwdcannotnul');
        data.resetPwdErr = $templateData.data('resetpwderr');
        data.resetPwd = $templateData.data('resetpwd');
        data.pwdRepeatMsg = $templateData.data('pwdrepeatmsg');
        data.resetPwdSucceeded = $templateData.data('resetpwdsucceeded');
        data.loadingNow = $templateData.data('loadingnow');
        data.pwdRepeat = $templateData.data('pwdrepeat');
        data.logoSrc = $templateData.data('logosrc') || '/oauth/static/main/img/logo.svg';
        data.validateLength = $templateData.data('validatelength');
        data.validateLower = $templateData.data('validatelower');
        data.validateUpper = $templateData.data('validateupper');
        data.validateDigit = $templateData.data('validatedigit');
        data.validateSpecial = $templateData.data('validatespecial');
        data.atLeast = $templateData.data('atleast');
        data.validateUserName = $templateData.data('validateusername'); // // copyright
        data.organizationId = $templateData.data('orgId');
        // data.copyright = $templateData.data('copyright') || 'Copyright ?? The HZERO Author??.All rights reserved.';

        storeData.initData = data;
        storeData.rootEl = $('#app').get(0);
        initInitialData();
        initQuery();
        initValidate();
    });
});