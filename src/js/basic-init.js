$(document).ready(function () {
    'use strict';

    const element = document.documentElement;

    // is mobile
    const is_mobile = isMobile();
    if (is_mobile) element.classList.add('is-mobile');

    // init modal
    $('.btn-modal').fancybox({
        touch : false,
        backFocus : false,
        btnTpl: {
            smallBtn: `
                <button class="modal-common__close fancybox-button fancybox-close-small" type="button" data-fancybox-close title="Закрыть">
                    <svg width="15" height="15" viewBox="0 0 320 320" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 160L315.3 52.3c6.2-6.2 6.2-16.3 0-22.6l-25-25c-6.2-6.2-16.3-6.2-22.6 0L160 112.4 52.3 4.7c-6.2-6.2-16.3-6.2-22.6 0l-25 25c-6.2 6.2-6.2 16.3 0 22.6L112.4 160 4.7 267.7c-6.2 6.2-6.2 16.3 0 22.6l25 25c6.2 6.2 16.3 6.2 22.6 0L160 207.6l107.7 107.7c6.2 6.2 16.3 6.2 22.6 0l25-25c6.2-6.2 6.2-16.3 0-22.6L207.6 160z"/></svg>
                </button>`
        },
    });

    // show/hide mobile menu
    $('.main-header__hamburger').on('click', function () {
        $('html').toggleClass('show-main-nav');
    });

    $('.sidenav a, .drawer-backdrop').on('click', function () {
        $('html').removeClass('show-main-nav');
    });

    // sticky menu
    let mainHeader = document.querySelector('.main-header');
    let mainHeaderWrapper = document.querySelector('.main-header__wr');
    let waypointOffset = 50;

    if (mainHeaderWrapper) {
        let waypoint = new Waypoint({
            element: mainHeader,
            handler: function (direction) {
                if (direction === 'down') {
                    mainHeader.style.height = mainHeaderWrapper.offsetHeight + 'px';
                    mainHeaderWrapper.classList.add('main-header__wr--sticky');
                    mainHeaderWrapper.classList.remove('main-header__wr--end-sticky');
                    mainHeaderWrapper.style.top = -mainHeaderWrapper.outerHTML + 'px';
                } else {
                    waypointOffset = 0;
                    mainHeader.style.height = 'auto';
                    mainHeaderWrapper.classList.remove('main-header__wr--sticky');
                    mainHeaderWrapper.classList.add('main-header__wr--end-sticky');
                }
            },
            offset: function() {
                return -(this.element.clientHeight + waypointOffset);
            }
        });
    }

    // smooth page scrolling
    $('.scrollto').click(function () {
        var elementClick = '#'+$(this).attr("href").split("#")[1]
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 0}, 800);
        return false;
    });

    ////////////////////////////////////////////////////////////////////////////
    // Send callback / Send request / Buy product

    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
    });

    $.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            let re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "Пожалуйста, проверьте свои данные"
    );

    function valEl(el) {
        let validator = el.validate({
            rules:{
                'user[name]': 'required',
                'user[phone]': {
                    required: true,
                    regex: '^([\+]+)*[0-9\x20\x28\x29\-]{5,20}$'
                },
                'user[email]': {
                    required: true,
                    email: true
                }
            },
            messages:{
                'user[name]': '',
                'user[phone]': '',
                'user[email]': {
                    required: '',
                    email: ''
                }
            },
            submitHandler: function (form) {

                let submitBtn = $(form).find('button');
                let submitBtnText = submitBtn.html();

                $.ajax({
                    url: '/sendrequest/',
                    data: new FormData(form),
                    type: 'POST',
                    beforeSend: function() {
                        submitBtn.prop('disabled', true).html('Отправка...');
                    },
                    success: function (data) {

                        // enable button
                        submitBtn.prop('disabled', false).html(submitBtnText);

                        if ( data == '1' ) {
                            $.fancybox.open({
                                src: `<div class="modal-thanks modal-common">
                                          <h4 class="modal-thanks__title">Спасибо, за Ваше обращение. Мы свяжемся с Вами в скором времени</h4>
                                      </div>`,
                                type : 'html',
                                touch : false,
                                btnTpl: {
                                    smallBtn: `
                                        <button class="modal-common__close fancybox-button fancybox-close-small" type="button" data-fancybox-close title="Закрыть">
                                            <svg width="15" height="15" viewBox="0 0 320 320" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 160L315.3 52.3c6.2-6.2 6.2-16.3 0-22.6l-25-25c-6.2-6.2-16.3-6.2-22.6 0L160 112.4 52.3 4.7c-6.2-6.2-16.3-6.2-22.6 0l-25 25c-6.2 6.2-6.2 16.3 0 22.6L112.4 160 4.7 267.7c-6.2 6.2-6.2 16.3 0 22.6l25 25c6.2 6.2 16.3 6.2 22.6 0L160 207.6l107.7 107.7c6.2 6.2 16.3 6.2 22.6 0l25-25c6.2-6.2 6.2-16.3 0-22.6L207.6 160z"/></svg>
                                        </button>`
                                },
                                afterClose: function () {
                                    $.fancybox.close();
                                }
                            });
                            jQuery(form).find('.form__field').each(function(){ jQuery(this).val(''); });

                        } else {
                            $.fancybox.open({
                                src: `<div class="modal-thanks modal-common">
                                          <h4 class="modal-thanks__title">Произошла ошибка при отправке заявки. Повторите отправку или перезвоните нам!</h4>
                                      </div>`,
                                type : 'html',
                                touch : false,
                                btnTpl: {
                                    smallBtn: `
                                        <button class="modal-common__close fancybox-button fancybox-close-small" type="button" data-fancybox-close title="Закрыть">
                                            <svg width="15" height="15" viewBox="0 0 320 320" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M207.6 160L315.3 52.3c6.2-6.2 6.2-16.3 0-22.6l-25-25c-6.2-6.2-16.3-6.2-22.6 0L160 112.4 52.3 4.7c-6.2-6.2-16.3-6.2-22.6 0l-25 25c-6.2 6.2-6.2 16.3 0 22.6L112.4 160 4.7 267.7c-6.2 6.2-6.2 16.3 0 22.6l25 25c6.2 6.2 16.3 6.2 22.6 0L160 207.6l107.7 107.7c6.2 6.2 16.3 6.2 22.6 0l25-25c6.2-6.2 6.2-16.3 0-22.6L207.6 160z"/></svg>
                                        </button>`
                                },
                                afterClose: function () {
                                    $.fancybox.close();
                                }
                            });
                        }
                    }
                });

                return false;
            }
        });
    }

    $('.js-form').each(function() {
        valEl( $(this) );
    });

    ////////////////////////////////////////////////////////////////////////////

    // masked input
    $('input[type="tel"]').mask("+38 (999) 999-99-99");

    // is mobile
    function isMobile() {
        return $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
    }

}); // end ready
