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
            'scrollTop': $target.offset().top - 65
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
        if (refElement.position().top - 66 <= scrollPosition && refElement.position().top +
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
        itemAmt = items.length;

    cycleItems();

    function cycleItems() {
        var item = items.eq(currentIndex),
            dot = dots.eq(currentIndex);

        items.hide();
        item.css('display','block');
        dots.removeClass('dot-active');
        dot.addClass('dot-active');
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

        if ($(this).hasClass('dot1')) {
            currentIndex = 0;
        } else
        if ($(this).hasClass('dot2')) {
            currentIndex = 1;
        } else currentIndex = 2;

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
//skrypt dla formularza
$(document).ready(function () {
    var button = $('#button');
    $(button).attr('disabled', 'disabled');

    $("#checkbox").click(function () {
        if ($('#checkbox').is(':checked') && $('#email').hasClass('ok')) {
            $('#button').removeAttr("disabled");
        }        }
    )
    $('#button').click(function () {
       $('.email-contener').toggle(400);
       $('#game').toggle(400);
    })

});
function check(adres) {

    if(adres.length === 0 ){
        $('#email').removeClass('bad');
        $('#email').removeClass('ok');
        $('#email').addClass('empty');

    }
    if (adres != "") {
        var re = new RegExp("[^@]{1,}[@]{1}[^@.]{1,}[.]{1}[^@]{1,}","gi");
        var wynik = re.test(adres);
        if (wynik == true) {
            $('#email').removeClass('empty');
            $('#email').removeClass('bad');
            $('#email').addClass('ok');
            button_disabled();
            return true;
        }
        if (wynik == false) {
            $('#email').removeClass('empty');
            $('#email').removeClass('ok');
            $('#email').addClass('bad');

            return false;
        }
    }

    function button_disabled() {
        if ($('#checkbox').is(':checked') && $('#email').hasClass('ok')) {
            $('#button').removeAttr("disabled");
        }}}

//cookies
$(document).ready(function () {
    //copyright JGA 2013 under MIT License
    var monster={set:function(e,t,n,r){var i=new Date,s="",o=typeof t,u="";r=r||"/",n&&(i.setTime(i.getTime()+n*24*60*60*1e3),s="; expires="+i.toGMTString());if(o==="object"&&o!=="undefined"){if(!("JSON"in window))throw"Bummer, your browser doesn't support JSON parsing.";u=JSON.stringify({v:t})}else u=escape(t);document.cookie=e+"="+u+s+"; path="+r},get:function(e){var t=e+"=",n=document.cookie.split(";"),r="",i="",s={};for(var o=0;o<n.length;o++){var u=n[o];while(u.charAt(0)==" ")u=u.substring(1,u.length);if(u.indexOf(t)===0){r=u.substring(t.length,u.length),i=r.substring(0,1);if(i=="{"){s=JSON.parse(r);if("v"in s)return s.v}return r=="undefined"?undefined:unescape(r)}}return null},remove:function(e){this.set(e,"",-1)},increment:function(e,t){var n=this.get(e)||0;this.set(e,parseInt(n,10)+1,t)},decrement:function(e,t){var n=this.get(e)||0;this.set(e,parseInt(n,10)-1,t)}};

    if (monster.get('cookieinfo') === 'true') {
        return false;
    }


    var container = document.createElement('div'),
        link = document.createElement('a');

    container.setAttribute('id', 'cookieinfo');
    container.setAttribute('class', 'cookie-alert');
    container.innerHTML = '<h6>Ta strona wykorzystuje pliki cookie</h6><p>Używamy informacji zapisanych za pomocą plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu z naszego serwisu. Mogą też korzystać z nich współpracujące z nami firmy badawcze oraz reklamowe. Jeżeli wyrażasz zgodę na zapisywanie informacji zawartej w cookies kliknij na &bdquo;x&rdquo; w prawym górnym rogu tej informacji. Jeśli nie wyrażasz zgody, ustawienia dotyczące plików cookies możesz zmienić w swojej przeglądarce.</p>';

    link.setAttribute('href', '#');
    link.setAttribute('title', 'Zamknij');
    link.innerHTML = 'x';

    function clickHandler(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        container.setAttribute('style', 'opacity: 1');

        var interval = window.setInterval(function() {
            container.style.opacity -= 0.01;

            if (container.style.opacity <= 0.02) {
                document.body.removeChild(container);
                window.clearInterval(interval);
                monster.set('cookieinfo', 'true', 365);
            }
        }, 4);
    }

    if (link.addEventListener) {
        link.addEventListener('click', clickHandler);
    } else {
        link.attachEvent('onclick', clickHandler);
    }

    container.appendChild(link);
    document.body.appendChild(container);

    return true;
})();
