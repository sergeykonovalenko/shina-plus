$(document).ready(function () {
    'use strict';

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

}); // end ready
