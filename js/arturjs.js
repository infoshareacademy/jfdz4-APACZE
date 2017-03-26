/**
 * Created by arturdrawc on 26.03.17.
 */
$(function () {
   var navbar = $('.navbar-collapse');
    navbar.on('click', 'a:not([data-toggle])', null, function(){
        navbar.collapse('hide');
    });
});