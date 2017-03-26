// $(function() {
//     $('#function-more-button').click(function() {
//         $('.functions-more').toggle();
//
//         var $txt = $(this).text();
//         $(this).text( $txt === 'Dowiedz się więcej' ? 'Mniej' : 'Dowiedz się więcej');
//
//         $('.function-first-title').slideToggle();
//         $('.functions-first-more').slideToggle();
//
//     });
// });

// zmiana functions-more z class na id
$(function() {
    $('#function-more-button').click(function() {
        // wydłużenie czasu rozwijania
        // $('#functions-more').toggle();
        $('#functions-more').toggle(400);

        var $txt = $(this).text();
        $(this).text( $txt === 'Dowiedz się więcej' ? 'Mniej' : 'Dowiedz się więcej');

        $('.function-first-title').slideToggle();
        $('.functions-first-more').slideToggle();

    });
});