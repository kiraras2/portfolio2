const page = 'top';

document.ontouchstart = function () { };
document.addEventListener('touchstart', function () { }, true);
document.addEventListener('touchstart', function () { }, false);

$(window).scroll(function () {
    if ($(window).scrollTop() > 100) {
        $('.l-themes-header').addClass('l-header-fade-in');
    } else { }
});

$(window).on('load', function () {
    $('#btn-nav-icon').on('click', function () {
        $('.p-tmp-menu').toggleClass('none');
    });
    $('#btn-nav-icon').on('click', function () {
        $('body').toggleClass('menu-opened');
        // if ($('body').hasClass('menu-opened')) {
        //     disableScrolling();
        // } else {
        //     enableScrolling();
        // }
    });
    $('#btn-nav-icon-cross').on('click', function () {
        $('.p-tmp-menu').addClass('none');
    });
    $('footer').hide().delay(2000).fadeIn(1000,);
    if ($('.js-scroll-trigger').length) {
        scrollAnimation();
    }
    $(window).trigger('scroll');
});

function scrollAnimation() {
    $(window).scroll(function () {
        $(".js-scroll-trigger").each(function () {
            var position = $(this).offset().top,
                scroll = $(window).scrollTop(),
                windowHeight = $(window).height();
            if (page != undefined && page == 'top') {
                if (scroll > position - windowHeight + 50) {
                    $(this).addClass('is-active');
                }
            } else {
                if (scroll > position - windowHeight) {
                    $(this).addClass('is-active');
                }
            }
        });
    });
}

$(document).ready(function () {
    $('footer').removeClass('d-none');

    $('a[href^="#"]').click(function () {
        var h2Hight = 155;
        var time = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" ? 'html' : href);
        var distance = target.offset().top - h2Hight;
        $("html, body").animate({
            scrollTop: distance
        }, time, "swing");
        return false;
    });
});

function setAccordion() {
    $('.accordion-trigger,.accordion-close').on('click', function () {
        const accordion_wrapper = $(this).closest('.accordion-wrapper')
        if (accordion_wrapper) {
            const accordion_body = accordion_wrapper.find('.accordion-body');
            if (accordion_body.is(':visible')) {
                accordion_body.slideUp();
                accordion_wrapper.removeClass('is-open');
            } else {
                accordion_body.slideDown();
                accordion_wrapper.addClass('is-open');
            }
        }
    })
}

function setScrollObserver() {
    const observer = new IntersectionObserver(onHideVisual, {
        root: null,
        rootMargin: "0% 0%",
        threshold: 0
    });
    const elm = document.querySelector('.js-mainvisual');
    if (elm) {
        observer.observe(elm);
    }
}

function onHideVisual(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.body.classList.remove("is-scroll");
        } else {
            document.body.classList.add("is-scroll");
        }
    });
}

let auto_redirect = localStorage.getItem('return_to');
if (auto_redirect) {
    localStorage.removeItem('return_to');
    window.location.href = auto_redirect;
}
else {
    $('#p-top-loading').addClass('d-none');
}
