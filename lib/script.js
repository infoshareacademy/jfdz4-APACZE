// skrypty dla menu
$(function () {
    var navbar = $('.navbar-collapse');
    navbar.on('click', 'a', null, function(){
        navbar.collapse('hide');
    });
});

$(document).ready(function () {
    $(document).on('scroll', onScroll);
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off('scroll');

        $('a').each(function () {
            $(this).removeClass('active');
        });
        $(this).addClass('active');

        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on('scroll', onScroll);
        });
    });
});

function onScroll (event) {
    var scrollPosition = $(document).scrollTop();
    $('nav a').each(function () {
        var currentLink = $(this);
        var refElement = $(currentLink.attr('href'));
        if (refElement.position().top <= scrollPosition && refElement.position().top +
            refElement.height() > scrollPosition) {
            $('nav ul li a').removeClass('active');
            currentLink.addClass('active');
        }
        else {
            currentLink.removeClass('active');
        }
    });
}

//slide
$(function() {

    var currentIndex = 0,
        items = $('#start .slide'),
        dots = $('#start .dot'),
        itemAmt = items.length

    cycleItems();

    function cycleItems() {
        var item = items.eq(currentIndex),
            dot = dots.eq(currentIndex);

        console.log('Idx inside cycleIt: ' + currentIndex);

        items.hide();
        item.css('display','inline-block');
        dots.removeClass('active');
        dot.addClass('active');
    }

    var autoSlide = setInterval(function() {
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    }, 2000);

    $('.next').click(function() {
        clearInterval(autoSlide);
        currentIndex += 1;
        if (currentIndex > itemAmt - 1) {
            currentIndex = 0;
        }
        cycleItems();
    });

    $('.prev').click(function() {
        clearInterval(autoSlide);
        currentIndex -= 1;
        if (currentIndex < 0) {
            currentIndex = itemAmt - 1;
        }
        cycleItems();
    });

    $('.dot').click(function() {
        clearInterval(autoSlide);

console.log('class:' + $(this).hasClass('dot1'));

        if ($(this).hasClass('dot1')) {
            currentIndex = 0;
        } else
        if ($(this).hasClass('dot2')) {
            currentIndex = 1;
        } else currentIndex = 2;

        console.log('currIdx2: ' + currentIndex);
        cycleItems();
    });

    items.on('click', function() {
        clearInterval(autoSlide);
    });

});


//opis funkcji
$(function() {
    $('#function-more-button').click(function() {
        $('#functions-more').toggle(400);

        var $txt = $(this).text();
        $(this).text( $txt === 'Dowiedz się więcej' ? 'Mniej' : 'Dowiedz się więcej');

        $('.function-first-title').slideToggle();
        $('.functions-first-more').slideToggle();

    });
});


