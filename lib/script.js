/**
 * Created by aniahb on 2017-03-23.
 */

$(function() {
    $('#function-more-button').click(function() {
        $('.functions-more').toggle();

        var $txt = $(this).text();
        $(this).text( $txt === 'Dowiedz się więcej' ? 'Mniej' : 'Dowiedz się więcej');


    });

});


