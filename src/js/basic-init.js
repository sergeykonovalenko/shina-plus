$(document).ready(function () {
    'use strict';

    // smooth page scrolling
    $('.scrollto').click(function () {
        var elementClick = '#'+$(this).attr("href").split("#")[1]
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination - 0}, 800);
        return false;
    });

}); // end ready
