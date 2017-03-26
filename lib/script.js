
$(function() {
    $('#function-more-button').click(function() {
        $('.functions-more').toggle();

        var $txt = $(this).text();
        $(this).text( $txt === 'Dowiedz się więcej' ? 'Mniej' : 'Dowiedz się więcej');

        $('.function-first-title').slideToggle();
        $('.functions-first-more').slideToggle();
        
    });

});


